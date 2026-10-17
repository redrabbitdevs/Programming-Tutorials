#!/usr/bin/env bash
# Repo validation: site build (which also validates every lesson's frontmatter
# via the content collection schemas), runnable examples, internal links.
# Exits non-zero on any failure and prints a short summary.
#
# Usage: scripts/validate.sh            full run (npm ci + build)
#        SKIP_INSTALL=1 scripts/validate.sh   reuse existing node_modules
#        PYTHON=/path/to/python3.15 scripts/validate.sh   interpreter for examples
# An example may have a sibling .in file, which is fed to it as stdin.
#        NODE=/path/to/node scripts/validate.sh   Node for JavaScript examples (*.mjs,
#        same .in/.out rules; *.test.mjs run with node --test, pass/fail counts only,
#        unless the .out holds the full spec report: see the comment in step 2b).
#        In a folder with a .modules marker file, and for *.cjs files, only files
#        that have a sibling .out run (the others are imported by those entry points).
#        In a folder with a .browser marker file (browser lessons; it holds a package.json
#        with "type": "module" so .js files are modules), *.js and *.mjs files are
#        syntax-checked only, unless they have a sibling .out: then they run in Node.
set -u -o pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE="$ROOT/site"
BASE_PATH="/Programming-Tutorials"
FAILURES=()
SUMMARY=()

step() { printf '\n== %s\n' "$1"; }
pass() { SUMMARY+=("PASS  $1"); }
fail() { SUMMARY+=("FAIL  $1"); FAILURES+=("$1"); }

# 1. Install and build -------------------------------------------------------
step "site: npm ci"
if [ "${SKIP_INSTALL:-0}" = "1" ] && [ -d "$SITE/node_modules" ]; then
  echo "skipped (SKIP_INSTALL=1)"
  pass "npm ci (skipped)"
elif (cd "$SITE" && npm ci --no-audit --no-fund); then
  pass "npm ci"
else
  fail "npm ci"
fi

step "site: npm run build (content schemas, MDX, Shiki)"
BUILD_OK=0
if (cd "$SITE" && npm run build); then
  pass "site build (lesson and language frontmatter parse)"
  BUILD_OK=1
else
  fail "site build"
fi

# 2. Runnable examples -------------------------------------------------------
step "examples: run every examples/**/*.py"
EX_RUN=0; EX_BAD=0; EX_CMP=0
# Run unbuffered, as a learner's terminal effectively does. Piped stdout is
# block-buffered, and each subinterpreter or child process has its own buffer,
# so buffered runs can print lines in a different order from the lesson.
export PYTHONUNBUFFERED=1
if [ -d "$ROOT/examples" ]; then
  while IFS= read -r -d '' f; do
    # Files inside a package (their folder has __init__.py) may use relative
    # imports and cannot run as scripts. The entry script that imports them runs.
    [ -f "$(dirname "$f")/__init__.py" ] && continue
    EX_RUN=$((EX_RUN + 1))
    rel="${f#"$ROOT"/}"
    expected="${f%.py}.out"
    stdin_file=/dev/null
    [ -f "${f%.py}.in" ] && stdin_file="${f%.py}.in"
    dir="$(cd "$(dirname "$f")" && pwd)"
    if grep -q 'unittest\.main(' "$f"; then
      # unittest examples: run as `python -m unittest -v FILE`, which is the command
      # the lessons show. The report goes to stderr, so merge it into the output,
      # then fix the timing in `Ran N tests in X.XXXs`. A failing run is expected
      # when the example has a .out file (the lessons show red tests on purpose).
      raw="$(cd "$dir" && timeout 30 "${PYTHON:-python3}" -m unittest -v "$(basename "$f")" 2>&1 <"$stdin_file"; echo "@@exit=$?")"
      code="${raw##*@@exit=}"
      actual="$(printf '%s' "${raw%@@exit=*}" | sed -E 's/^(Ran [0-9]+ tests?) in [0-9.]+s$/\1 in 0.001s/')"
      echo "$actual" >/tmp/validate_stderr.$$
      [ -f "$expected" ] && code=0
    else
      # A project with a src/ folder (src layout) runs as if installed with
      # `pip install -e .`: its src folder is put on the import path.
      run_env=(env)
      [ -d "$dir/src" ] && run_env=(env "PYTHONPATH=$dir/src")
      actual="$(cd "$dir" && timeout 30 "${run_env[@]}" "${PYTHON:-python3}" "$(basename "$f")" 2>/tmp/validate_stderr.$$ <"$stdin_file")"
      code=$?
    fi
    # Tracebacks and doctest reports print absolute paths. Strip this example's
    # own directory so the output is the same on every machine.
    actual="${actual//"$dir"\//}"
    if [ $code -ne 0 ]; then
      echo "  FAIL $rel (exit $code)"; sed 's/^/       /' /tmp/validate_stderr.$$ | head -10
      EX_BAD=$((EX_BAD + 1)); continue
    fi
    if [ -f "$expected" ]; then
      EX_CMP=$((EX_CMP + 1))
      if [ "$actual" != "$(cat "$expected")" ]; then
        echo "  FAIL $rel (stdout differs from ${expected#"$ROOT"/})"
        diff <(printf '%s\n' "$actual") "$expected" | head -10 | sed 's/^/       /'
        EX_BAD=$((EX_BAD + 1)); continue
      fi
    fi
    echo "  ok   $rel"
  done < <(find "$ROOT/examples" -name '*.py' -type f -print0 | sort -z)
  rm -f /tmp/validate_stderr.$$
fi
if [ $EX_BAD -eq 0 ]; then pass "examples: $EX_RUN run, $EX_CMP compared to .out"; else fail "examples: $EX_BAD of $EX_RUN failed"; fi

# 2b. JavaScript examples ----------------------------------------------------
step "js examples: run every examples/**/*.mjs entry point (NODE=${NODE:-node})"
JS_RUN=0; JS_BAD=0; JS_CMP=0; JS_CHK=0
if [ -d "$ROOT/examples" ]; then
  # Deterministic output: no colours, no experimental-feature warnings on stderr.
  # Real errors still fail the run through the exit code and are printed.
  export NODE_NO_WARNINGS=1 NO_COLOR=1
  unset FORCE_COLOR
  JS_ERR="$(mktemp)"
  while IFS= read -r -d '' f; do
    rel="${f#"$ROOT"/}"
    dir="$(cd "$(dirname "$f")" && pwd)"
    base="$(basename "$f")"
    # *.js is only an example in a folder marked .browser (elsewhere it is not ours).
    if [ "${base##*.}" = "js" ] && [ ! -f "$dir/.browser" ]; then continue; fi
    browser_only=0
    if [ -f "$dir/.browser" ] && [ ! -f "${f%.*}.out" ]; then browser_only=1; fi
    case "$rel" in
      */browser/*) browser_only=1 ;;
    esac
    case "$browser_only" in
      1)
        # Browser-only code cannot run in Node: syntax-check it as a module.
        JS_CHK=$((JS_CHK + 1))
        if "${NODE:-node}" --check "$f" 2>"$JS_ERR"; then echo "  ok   $rel (syntax only)"
        else echo "  FAIL $rel (syntax)"; head -10 "$JS_ERR" | sed 's/^/       /'; JS_BAD=$((JS_BAD + 1)); fi
        continue ;;
    esac
    # Multi-file examples: a module that other files import is not an entry point
    # and must not be run alone. Two conventions mark the entry points, and both
    # use the .out file, which every runnable entry has anyway:
    #   - a folder that contains a file named .modules: only files with a
    #     sibling .out are run (the rest are library modules, data or helpers);
    #   - CommonJS files (*.cjs): only those with a sibling .out are run.
    stem="${f%.*}"
    expected="$stem.out"
    if [ ! -f "$expected" ] && { [ -f "$dir/.modules" ] || [ "${base##*.}" = "cjs" ]; }; then
      continue
    fi
    JS_RUN=$((JS_RUN + 1))
    stdin_file=/dev/null
    [ -f "$stem.in" ] && stdin_file="$stem.in"
    case "$base" in
      *.test.mjs)
        # Tests: compare only the pass/fail counts from the spec reporter's
        # summary (timings and ordering are never compared). A red run is
        # expected when the example has a .out file.
        raw="$(cd "$dir" && timeout 60 "${NODE:-node}" --test --test-reporter=spec "$base" 2>"$JS_ERR" <"$stdin_file"; echo "@@exit=$?")"
        code="${raw##*@@exit=}"
        actual="$(printf '%s' "${raw%@@exit=*}" | sed -nE 's/^ℹ (tests|pass|fail) ([0-9]+)$/\1 \2/p')"
        # A .out that holds the report itself (it has an "ℹ tests N" line) is
        # compared in full, so a lesson can show what the runner prints. Only
        # what varies between runs is removed: the " (1.23ms)" after each name,
        # the "ℹ duration_ms" line, and the "failing tests:" section (stack
        # traces with absolute paths and Node-internal frames) at the end.
        if [ -f "$expected" ] && grep -q '^ℹ tests ' "$expected"; then
          actual="$(printf '%s' "${raw%@@exit=*}" | sed -E -e '/^✖ failing tests:$/,$d' -e 's/ \([0-9.]+ms\)//' -e '/^ℹ duration_ms /d')"
        fi
        [ -f "$expected" ] && code=0
        if [ -z "$actual" ] && [ $code -eq 0 ]; then code=1; echo "no test summary in output" >"$JS_ERR"; fi
        ;;
      *)
        actual="$(cd "$dir" && timeout 30 "${NODE:-node}" "$base" 2>"$JS_ERR" <"$stdin_file")"
        code=$?
        ;;
    esac
    # Stack traces print absolute paths, also as file:// URLs. Strip this
    # example's own directory so the output is the same on every machine.
    actual="${actual//"file://$dir"\//}"
    actual="${actual//"$dir"\//}"
    if [ $code -ne 0 ]; then
      echo "  FAIL $rel (exit $code)"; sed 's/^/       /' "$JS_ERR" | head -10
      JS_BAD=$((JS_BAD + 1)); continue
    fi
    if [ -f "$expected" ]; then
      JS_CMP=$((JS_CMP + 1))
      if [ "$actual" != "$(cat "$expected")" ]; then
        echo "  FAIL $rel (stdout differs from ${expected#"$ROOT"/})"
        diff <(printf '%s\n' "$actual") "$expected" | head -10 | sed 's/^/       /'
        JS_BAD=$((JS_BAD + 1)); continue
      fi
    fi
    echo "  ok   $rel"
  done < <(find "$ROOT/examples" \( -name '*.mjs' -o -name '*.cjs' -o -name '*.js' \) -type f -not -path '*/node_modules/*' -print0 | sort -z)
  rm -f "$JS_ERR"
fi
if [ $JS_BAD -eq 0 ]; then pass "js examples: $JS_RUN run, $JS_CMP compared to .out, $JS_CHK syntax-checked"; else fail "js examples: $JS_BAD of $((JS_RUN + JS_CHK)) failed"; fi

# 2c. C extension examples ---------------------------------------------------
# Each examples/python/**/NAME.c is a CPython extension from a lesson. It is
# compiled twice against $PYTHON's headers with gcc -Wall -Werror (a
# version-specific build and an abi3t stable-ABI build). Both are imported by
# running NAME.check under $PYTHON (and the abi3t build under $PYTHON_FT, a
# free-threaded python3.15t, if set); output must equal NAME.out. Titled c
# blocks in python lessons (NAME.c, NAME.c (continued)) must equal NAME.c.
# Skipped with a SKIP line when there is no C compiler or no Python.h.
step "c extensions: build and import examples/python/**/*.c (PYTHON_FT=${PYTHON_FT:-unset})"
CX_RUN=0; CX_BAD=0
CC_BIN="${CC:-gcc}"
PY_BIN="${PYTHON:-python3}"
CX_INC="$("$PY_BIN" -c 'import sysconfig; print(sysconfig.get_paths()["include"])' 2>/dev/null)"
CX_SUF="$("$PY_BIN" -c 'import sysconfig; print(sysconfig.get_config_var("EXT_SUFFIX"))' 2>/dev/null)"
CX_SKIP=""
if [ "$(uname -s)" != "Linux" ]; then CX_SKIP="not Linux"
elif ! command -v "$CC_BIN" >/dev/null 2>&1; then CX_SKIP="no C compiler ($CC_BIN)"
elif [ -z "$CX_INC" ] || [ ! -f "$CX_INC/Python.h" ]; then CX_SKIP="no Python.h for $PY_BIN"
fi
if [ -n "$CX_SKIP" ]; then
  echo "  SKIP $CX_SKIP"
  SUMMARY+=("SKIP  c extensions: $CX_SKIP")
else
  CX_TMP="$(mktemp -d)"
  while IFS= read -r -d '' f; do
    rel="${f#"$ROOT"/}"
    name="$(basename "${f%.c}")"
    check="${f%.c}.check"; expected="${f%.c}.out"
    CX_RUN=$((CX_RUN + 1))
    if [ ! -f "$check" ] || [ ! -f "$expected" ]; then
      echo "  FAIL $rel (needs ${name}.check and ${name}.out)"; CX_BAD=$((CX_BAD + 1)); continue
    fi
    ok=1
    for build in specific abi3t; do
      out="$CX_TMP/$name-$build"; mkdir -p "$out"
      if [ $build = specific ]; then flags=(); so="$out/$name$CX_SUF"
      else flags=(-DPy_LIMITED_API=0x030f0000 -DPy_TARGET_ABI3T=0x030f0000); so="$out/$name.abi3t.so"; fi
      if ! "$CC_BIN" -Wall -Werror -shared -fPIC -I"$CX_INC" "${flags[@]}" "$f" -o "$so" 2>"$CX_TMP/err"; then
        echo "  FAIL $rel ($build build)"; head -10 "$CX_TMP/err" | sed 's/^/       /'; ok=0; continue
      fi
      runners=("$PY_BIN")
      [ $build = abi3t ] && [ -n "${PYTHON_FT:-}" ] && runners+=("$PYTHON_FT")
      for py in "${runners[@]}"; do
        actual="$(cd "$CX_TMP" && PYTHONPATH="$out" timeout 30 "$py" "$check" 2>"$CX_TMP/err")"
        if [ $? -ne 0 ] || [ "$actual" != "$(cat "$expected")" ]; then
          echo "  FAIL $rel ($build build under $py)"
          diff <(printf '%s\n' "$actual") "$expected" | head -10 | sed 's/^/       /'
          head -10 "$CX_TMP/err" | sed 's/^/       /'; ok=0
        fi
      done
    done
    if [ $ok -eq 1 ]; then echo "  ok   $rel"; else CX_BAD=$((CX_BAD + 1)); fi
  done < <(find "$ROOT/examples/python" -name '*.c' -type f -print0 | sort -z)
  rm -rf "$CX_TMP"
  # Lesson C blocks against the example files (joined like continued python blocks).
  if ! python3 - "$ROOT" <<'PYEOF'
import sys
from pathlib import Path
root = Path(sys.argv[1])
sys.path.insert(0, str(root / "scripts"))
import check_lesson_examples as cle
bad = 0
for lesson in sorted((root / "site/src/content/lessons/python").rglob("*.mdx")):
    parts = {}
    for line, lang, title, _rest, code in cle.parse_blocks(lesson):
        if lang != "c" or not title:
            continue
        base = title.removesuffix(" (continued)")
        parts.setdefault(base, []).append(code)
    for base, codes in parts.items():
        cands = list((root / "examples/python").rglob(base))
        rel = lesson.relative_to(root)
        if not cands:
            print(f"  FAIL {rel}: no examples/python file for {base}"); bad += 1
        elif cle.squash("\n".join(codes)) != cle.squash(cands[0].read_text()):
            print(f"  FAIL {rel}: c blocks titled {base} differ from "
                  f"{cands[0].relative_to(root)}"); bad += 1
        else:
            print(f"  ok   {rel}: {base} ({len(codes)} blocks)")
sys.exit(1 if bad else 0)
PYEOF
  then CX_BAD=$((CX_BAD + 1)); fi
  if [ $CX_BAD -eq 0 ]; then pass "c extensions: $CX_RUN built twice, imported, compared to .out; lesson c blocks match"
  else fail "c extensions: $CX_BAD failed"; fi
fi

# 3. Internal links ----------------------------------------------------------
step "links: internal links in site/dist against base path $BASE_PATH"
if [ $BUILD_OK -eq 1 ]; then
  if python3 "$ROOT/scripts/check_links.py" "$SITE/dist" "$BASE_PATH"; then
    pass "internal links"
  else
    fail "internal links"
  fi
else
  fail "internal links (no build output)"
fi

# 4. Lesson code and output match the verified examples ------------------------
step "lesson examples: lesson blocks vs examples/ (allowlist: scripts/lesson_examples_allow.txt)"
LE_OUT="$(python3 "$ROOT/scripts/check_lesson_examples.py" 2>&1)"; LE_CODE=$?
printf '%s\n' "$LE_OUT"
if [ $LE_CODE -eq 0 ]; then pass "$(printf '%s\n' "$LE_OUT" | tail -1)"; else fail "lesson examples differ from examples/"; fi

# 5. Version claims ----------------------------------------------------------
step "versions: minVersion and <Since> consistency"
VER_OUT="$(python3 "$ROOT/scripts/check_versions.py" 2>&1)"; VER_CODE=$?
printf '%s\n' "$VER_OUT"
if [ $VER_CODE -eq 0 ]; then pass "$(printf '%s\n' "$VER_OUT" | tail -1)"; else fail "version claims (minVersion / <Since>)"; fi

# 6. Headings ----------------------------------------------------------------
step "frontmatter: no unquoted ' #' (YAML would cut the value)"
FM_OUT="$(python3 "$ROOT/scripts/check_frontmatter.py" 2>&1)"; FM_CODE=$?
printf '%s\n' "$FM_OUT"
if [ $FM_CODE -eq 0 ]; then pass "$(printf '%s\n' "$FM_OUT" | tail -1)"; else fail "frontmatter (unquoted # truncates a value)"; fi

step "fundamentals: every lesson's fundamentals ids exist"
FD_OUT="$(python3 "$ROOT/scripts/check_fundamentals.py" 2>&1)"; FD_CODE=$?
printf '%s\n' "$FD_OUT"
if [ $FD_CODE -eq 0 ]; then pass "$(printf '%s\n' "$FD_OUT" | tail -1)"; else fail "fundamentals ids (unknown lesson id)"; fi

step "lesson style: code blocks <=20 lines and <=80 columns (ratchet against baseline)"
LS_OUT="$(python3 "$ROOT/scripts/check_lesson_style.py" 2>&1)"; LS_CODE=$?
printf '%s\n' "$LS_OUT"
if [ $LS_CODE -eq 0 ]; then pass "$(printf '%s\n' "$LS_OUT" | tail -1)"; else fail "lesson style (more long/wide code blocks than baseline)"; fi

step "headings: no bare __dunder__ in lesson headings"
HD_OUT="$(python3 "$ROOT/scripts/check_headings.py" 2>&1)"; HD_CODE=$?
printf '%s\n' "$HD_OUT"
if [ $HD_CODE -eq 0 ]; then pass "$(printf '%s\n' "$HD_OUT" | tail -1)"; else fail "bare dunder in a lesson heading"; fi

# Summary --------------------------------------------------------------------
printf '\n== Summary\n'
printf '%s\n' "${SUMMARY[@]}"
if [ ${#FAILURES[@]} -gt 0 ]; then
  printf '\nvalidate.sh: FAILED (%d check(s))\n' "${#FAILURES[@]}"
  exit 1
fi
printf '\nvalidate.sh: all checks passed\n'

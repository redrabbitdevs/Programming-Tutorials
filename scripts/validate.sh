#!/usr/bin/env bash
# Repo validation: site build (which also validates every lesson's frontmatter
# via the content collection schemas), runnable examples, internal links.
# Exits non-zero on any failure and prints a short summary.
#
# Usage: scripts/validate.sh            full run (npm ci + build)
#        SKIP_INSTALL=1 scripts/validate.sh   reuse existing node_modules
#        PYTHON=/path/to/python3.15 scripts/validate.sh   interpreter for examples
# An example may have a sibling .in file, which is fed to it as stdin.
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

# Summary --------------------------------------------------------------------
printf '\n== Summary\n'
printf '%s\n' "${SUMMARY[@]}"
if [ ${#FAILURES[@]} -gt 0 ]; then
  printf '\nvalidate.sh: FAILED (%d check(s))\n' "${#FAILURES[@]}"
  exit 1
fi
printf '\nvalidate.sh: all checks passed\n'

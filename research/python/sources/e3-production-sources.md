# Module E3 (Production Python): source extracts

Fetched with `curl -sL` on 2026-10-14. docs.python.org serves the 3.15.0 documentation.
packaging.python.org was refused by this environment's network proxy (HTTP 403 on CONNECT),
so its pages were read from their source files in the `pypa/packaging.python.org` repository
(`main` branch, via raw.githubusercontent.com). Those files are what the site is built from.

## pylock.toml (PEP 751)

- https://peps.python.org/pep-0751/ header: "Status: Final", "Type: Standards Track",
  "Topic: Packaging", "Created: 24-Jul-2024", "Replaces: 665", "Resolution: 31-Mar-2025".
- Abstract: "This PEP proposes a new file format for specifying dependencies to enable
  reproducible installation in a Python environment. The format is designed to be
  human-readable and machine-generated. Installers consuming the file should be able to
  calculate what to install without the need for dependency resolution at install-time."
- Backwards Compatibility: "As for packaging tools themselves, that will be a per-tool decision
  as to whether they choose to support this PEP and in what way (i.e. as an export target or
  as the primary way they record their lock file)."
- Security Implications: tampering with a lock file is a risk "If a lock file is not kept in
  source control and properly audited"; the PEP "does not do anything to prevent a user from
  installing incorrect packages" (typosquatting).
- Reference Implementation: "A proof-of-concept implementing single-use lock files can be found
  at https://github.com/brettcannon/mousebender/tree/pep". No list of supporting tools.
- Specification (packaging.python.org `specifications/pylock-toml.rst`): file MUST be named
  `pylock.toml` or match `^pylock\.([^.]+)\.toml$`. `lock-version` is required, value `"1.0"`.
  `created-by` is required. `packages.archive.path` / `packages.wheels.path`: required "if url
  is not specified"; a relative path "MUST be relative to the location of this file".
  History: "April 2025: Initial version, approved via PEP 751." "March 2026: Clarify file name
  precedence for archives, sdists, and wheels."

### Tool support, observed locally (dated, third-party)

Checked 2026-10-14 in this environment, not from a primary doc:
- pip 26.2.1: `pip lock --help` says "EXPERIMENTAL - Lock packages and their dependencies",
  `-o, --output <path>  Lock file name (default=pylock.toml)`. `pip install -r` accepts
  "pip's requirements.txt format, or pylock.toml format. pylock.toml support is experimental."
  `pip lock iniconfig==2.3.1 -o -` printed (warning to stderr: "pip lock is currently an
  experimental command"):

  ```toml
  lock-version = "1.0"
  created-by = "pip"

  [[packages]]
  name = "iniconfig"
  version = "2.3.1"

  [[packages.wheels]]
  name = "iniconfig-2.3.1-py3-none-any.whl"
  url = "https://files.pythonhosted.org/packages/56/43/4ca9e49d27a1fcf6bece6f6aec0ea46bb9112489b93d4b688fb415457bdb/iniconfig-2.3.1-py3-none-any.whl"

  [packages.wheels.hashes]
  sha256 = "9121e2c1fdb355232495be3194c8dfe87ccc2d5dee45947b78e68f499790d7a7"
  ```
- uv 0.13.0: `uv export --format` lists `requirements.txt, pylock.toml, cyclonedx1.5`.
  `uv pip sync --help`: "Sync an environment with a `requirements.txt` or `pylock.toml` file".
  `uv publish --help` has `--trusted-publishing <automatic|always|never>` and `--publish-url`.

### Re-check 2026-10-15 (lessons 13-15 audit fixes)

- PyPI JSON API: pip 26.2.1 (uploaded 2026-08-04), uv 0.13.1 (2026-10-14), cibuildwheel 4.3.1.
- `pip install --no-cache-dir -r pylock.toml` (pip 26.2.1, fresh 3.15 venv) printed:
  "WARNING: Using pylock.toml as a requirements source is an experimental feature. It may be
  removed/changed in a future release without prior warning." then
  "Collecting iniconfig==2.3.1 (from pylock.toml)", "Downloading iniconfig-2.3.1-py3-none-any.whl
  (7.6 kB)", "Installing collected packages: iniconfig", "Successfully installed iniconfig-2.3.1".
- uv 0.13.1: `uv export --format` still lists `pylock.toml`; `uv pip sync pylock.toml` installed
  `iniconfig==2.3.1` with "warning: The `--pylock` option is experimental".
- Free-threaded wheel: a setuptools project with one C extension declaring
  `{Py_mod_gil, Py_MOD_GIL_NOT_USED}`, `uv build --wheel --python 3.15t` printed
  "Successfully built dist/fastcount-0.1.0-cp315-cp315t-linux_x86_64.whl". Installed into a
  `python3.15t -m venv`, `import sys, fastcount; print(sys._is_gil_enabled())` printed `False`.
  `python3.15 -m pip install` of the same wheel: "is not a supported wheel on this platform".
- py-free-threading.github.io/ci/ (page dated September 25, 2026): "cibuildwheel 3.1+ has support
  for building free-threaded wheels on all platforms and will build free-threaded wheels for
  Python 3.14 and newer in its default configuration." /porting/: classifiers
  "Programming Language :: Python :: Free Threading :: 1 - Unstable" ... "4 - Resilient".
  "pass -Xgil=0 or set PYTHON_GIL=0 ... while running tests to ensure the GIL is actually disabled".

## Building: what `uv build` produced (local, 2026-10-14)

`uv build` on a `src/tinyclock` project with hatchling as backend printed
"Building source distribution...", "Building wheel from source distribution...",
"Successfully built dist/tinyclock-0.1.0.tar.gz",
"Successfully built dist/tinyclock-0.1.0-py3-none-any.whl".
Wheel members: `tinyclock/__init__.py`, `tinyclock/cli.py`,
`tinyclock-0.1.0.dist-info/{METADATA,WHEEL,entry_points.txt,RECORD}`.
METADATA lines: `Name: tinyclock`, `Version: 0.1.0`, `Summary: ...`,
`License-Expression: MIT`, `Requires-Python: >=3.11`. entry_points.txt:
`[console_scripts]` / `tinyclock = tinyclock.cli:main`.

## Wheel filenames and tags

- `specifications/binary-distribution-format.rst`: wheel filename is
  `{distribution}-{version}(-{build tag})?-{python tag}-{abi tag}-{platform tag}.whl`.
- `specifications/platform-compatibility-tags.rst`: "The CPython stable ABI is ``abi3``".
  `manylinux_{x}_{y}_{arch}`: "x and y are glibc major and minor versions supported (e.g.
  manylinux_2_24_xxx should work on any distro using glibc 2.24+)". `py3-none-any` is the
  generic pure-Python tag.
- PEP 703: "The ABI tag will include the letter "t" (for "threading")" for `--disable-gil` builds.
- Core metadata (`specifications/core-metadata.rst`): "August 2024: Core metadata 2.4 was
  approved through PEP 639" (`License-Expression`). PEP 639 status Final.

## Versioning

`discussions/versioning.rst`: examples `1.2.0`, `1.2.0.dev1`, `1.2.0a1`, `1.2.0b1`,
`1.2.0rc1`, `1.2.0.post1`; "In order, the steps are: alpha releases, beta releases, release
candidates, final release. Pip and other modern Python package installers ignore pre-releases by
default ... unless explicitly requested (e.g., with pip install pkg==1.1a3 or pip install --pre
pkg)." Post-releases "should not be used for bug fixes". PEP 440 status Final.

## Uploading and trusted publishing

- `tutorials/packaging-projects.rst`: build with `python3 -m build`; upload with
  `python3 -m twine upload --repository testpypi dist/*`; TestPyPI "is a separate instance of
  the package index intended for testing and experimentation"; install with
  `python3 -m pip install --index-url https://test.pypi.org/simple/ --no-deps NAME`.
- `guides/publishing-package-distribution-releases-using-github-actions-ci-cd-workflows.rst`
  (label `trusted-publishing`): Trusted Publishing "is recommended for security reasons, since
  the generated tokens are created for each of your projects individually and expire
  automatically." Old `PYPI_API_TOKEN` secrets "are obsolete now and you should remove them".
  "Keep the build job separate from the publishing jobs. Building distributions in a publishing
  job is unsupported". "For security reasons, you must require manual approval on each run for
  the pypi environment." "Starting with version v1.11.0, pypa/gh-action-pypi-publish generates
  and uploads PEP 740-compatible attestations for each distribution by default."
- Sample workflow `github-actions-ci-cd-sample/publish-to-pypi.yml`: publish job has
  `if: startsWith(github.ref, 'refs/tags/')`, `environment: name: pypi`,
  `permissions: id-token: write  # IMPORTANT: mandatory for trusted publishing`, and
  `uses: pypa/gh-action-pypi-publish@release/v1`.
- PEP 740 (index support for digital attestations): Status Final, Resolution 17-Jul-2024.

## argparse colour and suggestions

- https://docs.python.org/3.14/library/argparse.html signature: `..., *,
  suggest_on_error=False, color=True)`. "By default, the help message is printed in color using
  ANSI escape sequences." "Added in version 3.14."
- https://docs.python.org/3/library/argparse.html (3.15): `suggest_on_error=True, color=True`.
  "Changed in version 3.14: suggest_on_error and color parameters were added."
  "Changed in version 3.15: suggest_on_error default changed to True." "if color=False, colored
  output is always disabled, even if environment variables like FORCE_COLOR are set." Backtick
  markup in description, epilog and help: "Added in version 3.15."
- What's New 3.14, argparse: "Enable color for help text, which can be disabled with the optional
  color parameter to argparse.ArgumentParser. This can also be controlled by environment
  variables. (gh-130645)"
- What's New 3.15, argparse: suggest_on_error now defaults to True (gh-140450); backtick markup
  (gh-142390, gh-149375).
- Command line docs: `PYTHON_COLORS` "takes precedence over NO_COLOR, which in turn takes
  precedence over FORCE_COLOR". PYTHON_COLORS "Added in version 3.13."
- `add_argument(..., deprecated=...)` is in the 3.15 signature (added in 3.13, per What's New 3.13).

## UTF-8 mode default (PEP 686)

- https://peps.python.org/pep-0686/: "Status: Final", "Python-Version: 3.15". "Python will
  enable UTF-8 mode by default from Python 3.15. Users can still disable UTF-8 mode by setting
  PYTHONUTF8=0 or -X utf8=0." "Most Unix systems use UTF-8 locale ... So this change mostly
  affects Windows users." Guideline: "Use EncodingWarning (PEP 597) to find every places UTF-8
  mode affects", "consider using encoding="utf-8" or encoding="locale"".
- What's New 3.15, Other language changes: "Python now uses UTF-8 as the default encoding,
  independent of the system's environment. This means that I/O operations without an explicit
  encoding, for example, open('flying-circus.txt'), will use UTF-8." "The special
  encoding='locale' argument uses the current locale encoding, and has been supported since
  Python 3.10." "To retain the previous behaviour, Python's UTF-8 mode may be disabled with the
  PYTHONUTF8=0 environment variable or the -X utf8=0 command-line option."

## Removed in 3.15 (What's New 3.15, "Removed")

ast node constructors raise TypeError on missing/unknown arguments; `ctypes.SetPointerType()`;
`datetime.strptime()` "now raises ValueError when the format string contains %d (day of month)
without a year directive. This has been deprecated since Python 3.13."; `glob.glob0()` and
`glob.glob1()`; `http.server.CGIHTTPRequestHandler` and `--cgi`; `load_module()` on importlib
loaders; `package` parameter of `importlib.resources.files()`; `PurePath.is_reserved()`;
`platform.java_ver()`; `sre_compile`, `sre_constants`, `sre_parse`; `check_home` of
`sysconfig.is_python_build()`; arbitrary args to C `RLock`; `codeobject.co_lnotab`;
`NamedTuple("Point", x=int, y=int)` keyword syntax; `TypedDict("TD")` / `TypedDict("TD", None)`;
`@typing.no_type_check_decorator`; `wave` mark methods; `zipimporter.load_module()`.
`ByteString` was removed from `typing.__all__` and `collections.abc.__all__` only (removal 3.17).

## Pending removal (docs.python.org/3/deprecations/)

- 3.16: setting `__loader__` without `__spec__.loader`; `array` `'u'` format code;
  `asyncio.iscoroutinefunction()`; asyncio policy system (`set_event_loop_policy` etc., use
  `asyncio.run(..., loop_factory=...)`); `~True`/`~False`; `functools.reduce()` keyword args
  (Python implementation); logging handlers with `strm`; undotted `mimetypes` extensions;
  `shutil.ExecError`; `symtable.Class.get_methods`; `sys._enablelegacywindowsfsencoding()`;
  `sysconfig.expand_makefile_vars()`; `TarFile.tarfile`.
- 3.17: `strptime()` with `%e` and no year ("deprecated since Python 3.15");
  `collections.abc.ByteString`, `typing.ByteString`; non-ASCII names to
  `encodings.normalize_encoding()`; `profile` module ("Use profiling.tracing instead");
  `webbrowser.MacOSXOSAScript`; `typing._UnionGenericAlias`; tkinter `trace_variable()` etc.

Observed on 3.15.0: `datetime.strptime("03-14", "%m-%d")` raises "ValueError: Day of month
directive '%d' may not be used without a year directive. ..."; `NamedTuple("P", x=int)` raises
"TypeError: NamedTuple() got an unexpected keyword argument 'x'"; `asyncio.iscoroutinefunction`,
`~True` and `import profile` emit DeprecationWarnings naming 3.16, 3.16 and 3.17.

## Lazy imports (PEP 810)

- https://peps.python.org/pep-0810/: "Status: Final", "Python-Version: 3.15",
  "Resolution: 03-Nov-2025".
- `sys.set_lazy_imports(mode)`: "normal" or "all"; "Library developers should generally not use
  this function". `sys.set_lazy_imports_filter(filter)`: called as
  `filter(importing_module, imported_module, fromlist)`, returns True to allow the import to be
  lazy, False to force an eager import. Both "Added in version 3.15."

## Security

- pickle: "Warning: The pickle module is not secure. Only unpickle data you trust. It is possible
  to construct malicious pickle data which will execute arbitrary code during unpickling."
- subprocess, Security Considerations: the library "will not implicitly choose to call a system
  shell"; "If the shell is invoked explicitly, via shell=True, it is the application's
  responsibility to ensure that all whitespace and metacharacters are quoted appropriately to
  avoid shell injection vulnerabilities. On some platforms, it is possible to use shlex.quote()".
- secrets: `token_bytes`, `token_hex`, `token_urlsafe`; "it is believed that 32 bytes (256 bits)
  of randomness is sufficient"; `compare_digest(a, b)`.
- tarfile: "Changed in version 3.12: Added the filter parameter." "Changed in version 3.14: The
  filter parameter now defaults to 'data'." Recommended: `filter='data'` "to support Python
  versions with a less secure default (3.13 and lower)."
- tarfile, What's New 3.15 (checked 2026-10-15): "data_filter() now normalizes symbolic link
  targets in order to avoid path traversal attacks" (CVE 2025-4138); "extract() and extractall()
  now (re-)apply the extraction filter when substituting a link (hard or symbolic) with a copy of
  another archive member, and when fixing up directory attributes. The former raises a new
  exception, LinkFallbackError" (CVE 2025-4330, CVE 2024-12718); "no longer extract rejected
  members when errorlevel() is zero" (CVE 2025-4435). tarfile docs: `LinkFallbackError` "Added in
  version 3.15"; Hints: "Even with filter='data', tarfile is not suited for extracting untrusted
  files without prior inspection."
- xml, "XML security" (3.15 docs): "By default, Expat itself does not access local files or create
  network connections. Expat versions lower than 2.7.2 may be vulnerable to the "billion laughs",
  "quadratic blowup" and "large tokens" vulnerabilities ... Check pyexpat.EXPAT_VERSION."
  "xmlrpc is vulnerable to the "decompression bomb" attack." Local 3.15.0, 3.14 and 3.10 builds:
  `expat_2.9.0`; a 548-byte billion-laughs document raises ParseError "limit on input
  amplification factor (from DTD and entities) breached". The page does not name defusedxml
  (third-party; named in the lesson without a version claim).
- ssl: create_default_context "Passing SERVER_AUTH as purpose sets verify_mode to CERT_REQUIRED";
  Best defaults: "load the system's trusted CA certificates, enable certificate validation and
  hostname checking". "Changed in version 3.13: The context now uses VERIFY_X509_PARTIAL_CHAIN
  and VERIFY_X509_STRICT in its default verify flags."
- signal, "Note on SIGPIPE": catch BrokenPipeError, then `os.dup2(devnull, sys.stdout.fileno())`
  "to avoid another BrokenPipeError at shutdown". argparse: "FileType ... Deprecated since
  version 3.14." What's New 3.15 Porting: "in add_argument('-f', '-foo'), dest is now 'foo'
  instead of 'f'. Pass an explicit dest argument to preserve the old behavior." Checked: 3.15
  `Namespace(foo='x')`, 3.14 `Namespace(f='x')`.

## Observability

- faulthandler: module "Added in version 3.3"; `enable(file=sys.stderr, all_threads=True,
  c_stack=True, *, max_threads=100)`; "Changed in version 3.14: The dump now displays the C stack
  trace if c_stack is true."; "Changed in version 3.15: Added the max_threads keyword argument."
- logging.config: `dictConfig(config)`; dictionary schema needs `version`.

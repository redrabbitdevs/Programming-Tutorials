# Sources for Python expert module E1 (Performance)

Fetched 2026-10-14 with `curl -sL` from docs.python.org/3.15 and peps.python.org.
Excerpts are verbatim (HTML stripped). Checked locally against CPython 3.15.0
(`/root/.local/bin/python3.15`, built with `--with-tail-call-interp` and
`--enable-experimental-jit=yes-off`).

## PEP 799: profiling package and Tachyon (3.15)

peps.python.org/pep-0799/ — Status: **Final**.

> profiling.tracing: deterministic function-call tracing (relocated from cProfile).
> profiling.sampling: the statistical sampling profiler (tachyon).
> The cProfile implementation will be relocated to profiling.tracing, with cProfile
> remaining as an alias for backwards compatibility.

> In Python 3.15: importing profile emits a DeprecationWarning.
> In Python 3.16: all uses of profile emit a DeprecationWarning.
> In Python 3.17: the module will be removed from the standard library.

docs.python.org/3.15/library/profiling.sampling.html:

> Added in version 3.15.
> The profiling.sampling module, named Tachyon, provides statistical
> profiling of Python programs through periodic stack sampling.

> The time values shown in Tachyon's output are estimates derived from sample
> counts, not direct measurements.

> When you need exact call counts, sampling cannot provide them. [...] use profiling.tracing.

> On Linux, the profiler uses ptrace or process_vm_readv to read the
> target process's memory. This typically requires one of: Running as root;
> Having the CAP_SYS_PTRACE capability; Adjusting the Yama ptrace scope

> The profiler and target process must run the same Python minor version

Modes: `--mode {wall,cpu,gil,exception}` (default wall). Output formats:
`--pstats` (default), `--collapsed`, `--flamegraph`, `--gecko`, `--heatmap`,
`--diff-flamegraph BASELINE`, `--jsonl`, `--binary`. Commands: run, attach,
dump, replay. Collapsed format:

> Each line contains semicolon-separated function names representing the call
> stack from bottom to top, followed by a space and the sample count.

Local check: `python3.15 -m profiling.sampling run --help` lists exactly these
options. `python3.15 -m profiling.tracing -s tottime script.py` works like
`python -m cProfile`.

## bytearray.take_bytes (3.15)

docs.python.org/3.15/library/stdtypes.html:

> take_bytes(n=None, /) Remove the first n bytes from the bytearray and return
> them as an immutable bytes. By default (if n is None), return all bytes and
> clear the bytearray. [...] Taking less than the full length will leave
> remaining bytes in the bytearray, which requires a copy.
> CPython implementation detail: Taking all bytes is a zero-copy operation.
> Added in version 3.15

Local measurement (tracemalloc peak while taking all 8,000,000 bytes): exact-size
buffer filled with `readinto` -> 0 bytes allocated; buffer grown with `+=`
(spare capacity) -> 8,000,033 bytes allocated. The lesson teaches the
exact-size case and says to measure.

## Tail-calling interpreter (3.14)

docs.python.org/3.15/whatsnew/3.14.html, "A new type of interpreter":

> It uses tail calls between small C functions that implement individual
> Python opcodes, rather than one large C case statement. [...] Preliminary
> benchmarks suggest a geometric mean of 3-5% faster [...] This interpreter
> currently only works with Clang 19 and newer on x86-64 and AArch64
> architectures. [...] This feature is opt-in for now.
> This is not to be confused with tail call optimization of Python functions,
> which is currently not implemented in CPython.

using/configure.html: `--with-tail-call-interp` "Added in version 3.14."

whatsnew/3.15.html: "The official Windows 64-bit binaries now use the
tail-calling interpreter" and "64-bit builds using Visual Studio 2026 (MSVC 18)
may now use the new tail-calling interpreter. [...] 15-20% speedup on the
geometric mean of pyperformance on Windows x86-64 over the switch-case
interpreter".

## JIT status in 3.15

whatsnew/3.15.html, "Upgraded experimental JIT compiler":

> Results from the pyperformance benchmark suite report a 7-8% geometric mean
> performance improvement for the JIT over the standard CPython interpreter
> built with all optimizations enabled on x86-64 Linux. On AArch64 macOS, the
> JIT has an 11-12% speedup over the tail calling interpreter [...] The
> speedups for JIT builds versus no JIT builds range from roughly 15% slowdown
> to over 100% speedup

> As always, LLVM is only needed when building CPython with the JIT enabled;
> end users running Python do not need LLVM installed.

whatsnew/3.14.html, "Binary releases for the experimental just-in-time compiler":

> The official macOS and Windows release binaries now include an experimental
> just-in-time (JIT) compiler. Although it is not recommended for production
> use, it can be tested by setting PYTHON_JIT=1

using/configure.html:

> --enable-experimental-jit=[no|yes|yes-off|interpreter] [...] yes-off: Build
> the JIT, but disable it by default. To enable it at runtime, set the
> environment variable PYTHON_JIT=1. [...] --enable-experimental-jit=no is the
> default behavior if the option is not provided

library/sys.html: `sys._jit` "Added in version 3.14", `is_available()`,
`is_enabled()`, `is_active()`; "JIT compilation is an experimental
implementation detail of CPython."

peps.python.org/pep-0744/ (JIT): Status **Draft**.

## Specialising adaptive interpreter (3.11)

whatsnew/3.11.html: "PEP 659: Specializing Adaptive Interpreter [...] Python
will then replace the current operation with a more specialized one [...]
Python can also de-specialize when code is too dynamic or when the use changes."
"Python 3.11 is between 10-60% faster than Python 3.10. On average, we measured
a 1.25x speedup on the standard benchmark suite." PEP 659 Status: Final.

## abi3t (PEP 803, 3.15)

peps.python.org/pep-0803/ — Status: **Final**, Python-Version 3.15.

> Add a new variant of the Stable ABI, called "Stable ABI for Free-Threaded
> Python" (or abi3t for short). abi3t will be based on the existing Stable ABI
> (abi3), but make the PyObject structure opaque. [...] In practice, abi3t 3.15
> will be compatible with abi3 3.15. Extension authors are encouraged to
> explicitly compile for both ABIs at once, and signal compatibility using the
> wheel tag abi3.abi3t.

> the C preprocessor macro Py_TARGET_ABI3T will enable compiling for abi3t

whatsnew/3.15.html: "Tools with abi3t support include meson-python,
scikit-build-core, and Maturin [...] If your build tool does not support abi3t,
compile for cp315t separately." Requires switching to `PyModExport_*` (PEP 793)
and PEP 697 APIs.

library/sys.html: `sys.abi_info` "Added in version 3.15" with `pointer_bits`,
`free_threaded`, `debug`, `byteorder`.

## timeit (3.15)

whatsnew/3.15.html: "The output of the timeit command-line interface is
colored by default. This can be controlled with environment variables." and
"Make the target time of timeit.Timer.autorange() configurable and add
--target-time option to the command-line interface."

library/timeit.html: "-t, --target-time=T [...] (default: 0.2) Added in
version 3.15." and "Added in version 3.15: Output is in color by default".

## Other

- whatsnew/3.15.html: "Allowed defining the __dict__ and __weakref__ __slots__
  for any class." (not used in the lessons)
- whatsnew/3.15.html, ctypes: complex `_type_` codes changed; `SetPointerType`
  removed. Neither affects the ctypes examples.

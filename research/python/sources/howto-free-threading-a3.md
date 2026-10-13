# Free threading: howto, What's New 3.14/3.15, sys, PEP 703/779 status

- URL: https://docs.python.org/3/howto/free-threading-python.html, https://docs.python.org/3/whatsnew/3.14.html, https://docs.python.org/3/whatsnew/3.15.html
- Accessed: 2026-10-12
- Retrieval: curl -sL (primary source), HTML stripped

Trimmed extract (verbatim lines, some omitted):

```text
        Light
        Dark
 |
Python support for free threading¶
Starting with the 3.13 release, CPython has support for a build of
Python called free threading where the global interpreter lock
(GIL) is disabled.  Free-threaded execution allows for full utilization of the
available processing power by running threads in parallel on available CPU cores.
While not all software will benefit from this automatically, programs
designed with threading in mind will run faster on multi-core hardware.
Some third-party packages, in particular ones
with an extension module, may not be ready for use in a
free-threaded build, and will re-enable the GIL.
This document describes the implications of free threading
for Python code.  See C API Extension Support for Free Threading for information on
how to write C extensions that support the free-threaded build.
See also
PEP 703 – Making the Global Interpreter Lock Optional in CPython for an
overall description of free-threaded Python.
Installation¶
Starting with Python 3.13, the official macOS and Windows installers
optionally support installing free-threaded Python binaries.  The installers
are available at https://www.python.org/downloads/.
For information on other platforms, see the Installing a Free-Threaded Python, a
community-maintained installation guide for installing free-threaded Python.
When building CPython from source, the --disable-gil configure option
should be used to build a free-threaded Python interpreter.
Identifying free-threaded Python¶
To check if the current interpreter supports free-threading, python -VV
and sys.version contain “free-threading build”.
The new sys._is_gil_enabled() function can be used to check whether
the GIL is actually disabled in the running process.
The sysconfig.get_config_var("Py_GIL_DISABLED") configuration variable can
be used to determine whether the build supports free threading.  If the variable
is set to 1, then the build supports free threading.  This is the recommended
mechanism for decisions related to the build configuration.
The global interpreter lock in free-threaded Python¶
Free-threaded builds of CPython support optionally running with the GIL enabled
at runtime using the environment variable PYTHON_GIL or
the command-line option -X gil.
The GIL may also automatically be enabled when importing a C-API extension
module that is not explicitly marked as supporting free threading.  A warning
will be printed in this case.
In addition to individual package documentation, the following websites track
the status of popular packages support for free threading:
https://py-free-threading.github.io/tracking/
https://hugovk.github.io/free-threaded-wheels/
Thread safety¶
The free-threaded build of CPython aims to provide similar thread-safety
behavior at the Python level to the default GIL-enabled build.  Built-in
types like dict, list, and set use internal locks
to protect against concurrent modifications in ways that behave similarly to
the GIL.  See Thread Safety Guarantees for the guarantees provided by built-in types.
Note
It’s recommended to use the threading.Lock or other synchronization
primitives instead of relying on the internal locks of built-in types, when
possible.
Known limitations¶
This section describes known limitations of the free-threaded CPython build.
Immortalization¶
In the free-threaded build, some objects are immortal.
Immortal objects are not deallocated and have reference counts that are
never modified.  This is done to avoid reference count contention that would
prevent efficient multi-threaded scaling.
--- whatsnew/3.14.html
Free-threaded mode improvements¶
CPython’s free-threaded mode (PEP 703), initially added in 3.13,
has been significantly improved in Python 3.14.
The implementation described in PEP 703 has been finished, including C API
changes, and temporary workarounds in the interpreter were replaced with
more permanent solutions.
The specializing adaptive interpreter (PEP 659) is now enabled
in free-threaded mode, which along with many other optimizations
greatly improves its performance.
The performance penalty on single-threaded code in free-threaded mode
is now roughly 5-10%, depending on the platform and C compiler used.
Free-threaded Python is officially supported¶
The free-threaded build of Python is now supported and no longer experimental.
This is the start of phase II where
free-threaded Python is officially supported but still optional.
The free-threading team are confident that the project is on the right path,
and appreciate the continued dedication from everyone working to make
free-threading ready for broader adoption across the Python community.
With these recommendations and the acceptance of this PEP, the Python developer
community should broadly advertise that free-threading is a supported
Python build option now and into the future, and that it will not be removed
without a proper deprecation schedule.
Any decision to transition to phase III,
with free-threading as the default or sole build of Python is still undecided,
and dependent on many factors both within CPython itself and the community.
This decision is for the future.
--- whatsnew/3.15.html
The official macOS binaries now install free-threading support by default
PEP 803: Stable ABI for free-threaded builds¶
C extensions that target the Stable ABI can now be
compiled for the new Stable ABI for Free-Threaded Builds (also known
as abi3t), which makes them compatible with
free-threaded builds of CPython.
--- sys.html
sys._is_gil_enabled()¶
Return True if the GIL is enabled and False if
it is disabled.
Added in version 3.13.
--- PEP 703 / PEP 779 status
Status:
Final
Status:
Final
--- using/windows.html (https://docs.python.org/3/using/windows.html)
4.1.12. Installing free-threaded binaries¶
Added in version 3.13.
Pre-built distributions of the free-threaded build are available
by installing tags with the t suffix.
$> py install 3.14t
$> py install 3.14t-arm64
$> py install 3.14t-32
This will install and register as normal. If you have no other runtimes
installed, then python will launch this one. Otherwise, you will need to use
py -V:3.14t ... or, if you have added the global aliases directory to your
PATH environment variable, the python3.14t.exe commands.
--- using/mac.html (https://docs.python.org/3/using/mac.html)
Added in version 3.13.
Changed in version 3.15: Free-threading support is now installed by default.
The python.org Python for macOS
installer package installs, by default, an additional build of
Python 3.15 that supports free threading
(running with the global interpreter lock disabled).
Check the release page on python.org for possible updated information.
The free-threaded mode is working and continues to be improved, but
there is some additional overhead in single-threaded workloads compared
to the regular build. Additionally, third-party packages, in particular ones
with an extension module, may not be ready for use in a
free-threaded build, and will re-enable the GIL.
As of Python 3.15, free-threading support is installed by default.
It is packaged as a separate install option, which can be deselected
by clicking the Customize button on the Installation Type
step of the installer as described above.
If the box next to the Free-threaded Python package name is checked
(as it is by default),
a separate PythonT.framework will also be installed
alongside the normal Python.framework in /Library/Frameworks.
This configuration allows a free-threaded Python 3.15 build to co-exist
on your system with a traditional (GIL only) Python 3.15 build with
minimal risk while installing or testing. This installation layout may
--- builtins/threadsafety.html (https://docs.python.org/3/builtins/threadsafety.html)
free-threaded build. The guarantees described here apply when using Python with
the GIL disabled (free-threaded mode). When the GIL is enabled, most
operations are implicitly serialized.
For general guidance on writing thread-safe code in free-threaded Python, see
Python support for free threading.
Thread safety levels¶
--- builtins/threadsafety.html, lists
lst.copy()     # returns a shallow copy of the list
The following methods that only operate on a single element with no shifting
required are atomic:
lst.append(x)  # append to the end of the list, no shifting required
lst.pop()      # pop element from the end of the list, no shifting required
The clear() method is also atomic.
Other threads cannot observe elements being removed.
The sort() method is not atomic.
Other threads cannot observe intermediate states during sorting, but the
list appears empty for the duration of the sort.
The following operations may allow lock-free operations to observe
intermediate states since they modify multiple elements in place:
lst.insert(idx, item)  # shifts elements
lst.pop(idx)           # idx not at the end of the list, shifts elements
lst *= x               # copies elements in place
The remove() method may allow concurrent modifications since
element comparison may execute arbitrary Python code (via
__eq__()).
extend() is safe to call from multiple threads.  However, its
guarantees depend on the iterable passed to it. If it is a list, a
tuple, a set, a frozenset, a dict or a
dictionary view object (but not their subclasses), the
extend operation is safe from concurrent modifications to the iterable.
Otherwise, an iterator is created which can be concurrently modified by
another thread.  The same applies to inplace concatenation of a list with
other iterables when using lst += iterable.
Similarly, assigning to a list slice with lst[i:j] = iterable is safe
to call from multiple threads, but iterable is only locked when it is
also a list (but not its subclasses).
Operations that involve multiple accesses, as well as iteration, are never
atomic. For example:
# NOT atomic: read-modify-write
lst[i] = lst[i] + 1
# NOT atomic: check-then-act
if lst:
    item = lst.pop()
# NOT thread-safe: iteration while modifying
for item in lst:
    process(item)  # another thread may modify lst
Consider external synchronization when sharing list instances
--- using/cmdline.html (https://docs.python.org/3/using/cmdline.html)
PYTHON_GIL¶
If this variable is set to 1, the global interpreter lock (GIL) will be
forced on. Setting it to 0 forces the GIL off (needs Python configured with
the --disable-gil build option).
See also the -X gil command-line option, which takes
precedence over this variable, and Free-threaded CPython.

Added in version 3.13.
--- PEP 803 (https://peps.python.org/pep-0803/)
Status:
Final
--- PEP 803 (cont.)
As with the current Stable ABI (abi3), abi3t will be versioned
using major (3) and minor versions of Python interpreter.
Extensions built for abi3t 3.x will be compatible with
free-threading builds of CPython 3.x and above.
This mirrors the compatibility promise for the existing Stable ABI, abi3,
which was defined PEP 384 and modified in
```

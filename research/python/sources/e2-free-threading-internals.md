# e2-free-threading-internals: extracts for Python module E2 (fetched 2026-10-14)

## https://peps.python.org/pep-0703/

[lines 540-600 of the text dump]

reference counting, which is a thread-safe reference counting
technique with lower execution overhead than plain atomic reference
counting. The other two techniques are immortalization and a limited
form of deferred reference counting; they address some of the
multi-threaded scalability issues with reference counting by avoiding
some reference count modifications.

Biased reference counting (BRC) is a technique first described in 2018
by Jiho Choi, Thomas Shull, and Josep Torrellas [3]. It is based on the
observation that most objects are only accessed by a single thread,
even in multi-threaded programs. Each object is associated with an
owning thread (the thread that created it). Reference counting
operations from the owning thread use non-atomic instructions to
modify a “local” reference count. Other threads use atomic
instructions to modify a “shared” reference count. This design avoids
many atomic read-modify-write operations that are expensive on
contemporary processors.

The implementation of BRC proposed in this PEP largely matches the
original description of biased reference counting, but differs in
details like the size of reference counting fields and special bits in
those fields. BRC requires storing three pieces of information in each
object’s header: the “local” reference count, the “shared” reference
count, and the identifier of the owning thread.  The BRC paper packs
these three things into a single 64-bit field.  This PEP proposes using
three separate fields in each object’s header to avoid potential issues
due to reference count overflow.  Additionally, the PEP supports a
faster deallocation path that avoids an atomic operation in the common
case.

The proposed PyObject struct (also called struct _object) is
below:

struct _object {
  _PyObject_HEAD_EXTRA
  uintptr_t ob_tid;         // owning thread id (4-8 bytes)
  uint16_t __padding;       // reserved for future use (2 bytes)
  PyMutex ob_mutex;         // per-object mutex (1 byte)
  uint8_t ob_gc_bits;       // GC fields (1 byte)
  uint32_t ob_ref_local;    // local reference count (4 bytes)
  Py_ssize_t ob_ref_shared; // shared reference count and state bits (4-8 bytes)
  PyTypeObject *ob_type;
};

The ob_tid, ob_ref_local, and ob_ref_shared are used by
the biased reference counting implementation.  The ob_gc_bits field
is used store garbage collection flags that were previously stored in
PyGC_Head (see Garbage Collection (Cycle Collection)).  The
ob_mutex field provides a per-object lock in a single byte.

Immortalization

Some objects, such as interned strings, small integers, statically
allocated PyTypeObjects, and the True, False, and None
objects stay alive for the lifetime of the program. These objects are
marked as immortal by setting the local reference count field
(ob_ref_local) to UINT32_MAX.

The Py_INCREF and Py_DECREF macros are no-ops for immortal
objects.  This avoids contention on the reference count fields of
these objects when multiple threads access them concurrently.

[lines 749-760 of the text dump]

Deferred Reference Counting

A few types of objects, such as top-level functions, code objects,
modules, and methods, tend to be frequently accessed by many threads
concurrently.  These objects don’t necessarily live for the lifetime of
the program, so immortalization is not a good fit. This PEP proposes a
limited form of deferred reference counting to avoid contention on
these objects’ reference count fields in multi-threaded programs.

Typically, the interpreter modifies objects’ reference counts as they
are pushed to and popped from the interpreter’s stack. The
interpreter skips these reference counting operations for objects

[lines 895-925 of the text dump]

that stored the tracked, finalized, and unreachable states are moved
to the ob_gc_bits field in the PyObject header.

Stop-the-World

The CPython cycle garbage collector currently relies on the global
interpreter lock to prevent other threads from accessing Python
objects while the collector finds cycles.  The GIL is never released
during the cycle-finding routine, so the collector can rely on
stable (i.e., unchanging) reference counts and references for the
duration of that routine. However, following cycle detection, the GIL
may be temporarily released while calling objects’ finalizers and
clear (tp_clear) functions, allowing other threads to run in an
interleaved fashion.

When running without the GIL, the implementation needs a way to ensure
that reference counts remain stable during cycle detection. Threads
running Python code must be paused to ensure that references and
reference counts remain stable. Once the cycles are identified, other
threads are resumed.

The current CPython cyclic garbage collector involves two
cycle-detection passes during each garbage collection cycle.
Consequently, this requires two stop-the-world pauses when running the
garbage collector without the GIL.  The first cycle-detection pass
identifies cyclic trash. The second pass runs after finalizers to
identify which objects still remain unreachable.  Note that other
threads are resumed before finalizers and tp_clear functions are
called to avoid introducing potential deadlocks that are not present in
the current CPython behavior.

[lines 1468-1475 of the text dump]

Non-Generational Garbage Collection

This PEP proposes switching from a generational cyclic garbage
collector to a non-generational collector (when CPython is built
without the GIL). That is equivalent to only having one generation
(the “old” generation). There are two reasons for this proposed
change.

## https://peps.python.org/pep-0779/

[lines 80-92 of the text dump]

The acceptance of PEP 703 (Making the Global Interpreter Lock Optional in
CPython), as announced by the Steering Council,
describes three phases of development for the work to remove the Global
Interpreter Lock. Phase I started early in the development of Python 3.13,
and includes making the free-threaded (GIL-less) Python build available but
explicitly experimental. Phase II would make the free-threaded build
officially supported but still optional, and phase III would make the
free-threaded build the default. Because of the number of unknowns at the
time, the criteria for moving to the next phase were left deliberately vague
at the time. This PEP establishes clear expectations and requirements for
moving to Phase II, making the free-threaded Python build officially
supported.

[lines 215-220 of the text dump]

for phase II of PEP 703.

(Note that these are requirements for entering phase II only. The decision
to make free-threaded Python the default (phase III) is very different, and
we expect it will revolve around community support, willingness, and showing
clear benefit. That’s left for a future PEP.)

## https://docs.python.org/3/c-api/module.html

[lines 250-278 of the text dump]

Py_mod_gil¶

 Part of the Stable ABI since version 3.13.
Slot ID whose value is one of:

Py_MOD_GIL_USED¶

The module depends on the presence of the global interpreter lock (GIL),
and may access global state without synchronization.

Py_MOD_GIL_NOT_USED¶

The module is safe to run without an active GIL.

This slot is ignored by Python builds not configured with
--disable-gil.  Otherwise, it determines whether or not importing
this module will cause the GIL to be automatically enabled. See
Free-threaded CPython for more detail.

If Py_mod_gil is not specified, the import machinery defaults to
Py_MOD_GIL_USED.

For historical reasons, the values are declared as pointers (void *).
When using PySlot arrays, use PySlot_DATA for
Py_mod_gil:

PySlot_DATA(Py_mod_gil, Py_MOD_GIL_NOT_USED)

Added in version 3.13.

## https://docs.python.org/3/howto/free-threading-extensions.html

[lines 64-106 of the text dump]

the GIL disabled depending on whether the extension uses multi-phase or
single-phase initialization.

Multi-Phase Initialization¶

Extensions that use multi-phase initialization
(functions like PyModuleDef_Init(),
PyModExport_* export hook,
PyModule_FromSlotsAndSpec()) should add a
Py_mod_gil slot in the module definition.
If your extension supports older versions of CPython,
you should guard the slot with a PY_VERSION_HEX check.

static struct PyModuleDef_Slot module_slots[] = {
    ...
#if PY_VERSION_HEX >= 0x030D0000
    {Py_mod_gil, Py_MOD_GIL_NOT_USED},
#endif
    {0, NULL}
};

Single-Phase Initialization¶

Extensions that use legacy single-phase initialization
(that is, PyModule_Create()) should call PyUnstable_Module_SetGIL() to
indicate that they support running with the GIL disabled.  The function is
only defined in the free-threaded build, so you should guard the call with
#ifdef Py_GIL_DISABLED to avoid compilation errors in the regular build.

static struct PyModuleDef moduledef = {
    PyModuleDef_HEAD_INIT,
    ...
};

PyMODINIT_FUNC
PyInit_mymodule(void)
{
    PyObject *m = PyModule_Create(&moduledef);
    if (m == NULL) {
        return NULL;
    }
#ifdef Py_GIL_DISABLED
    PyUnstable_Module_SetGIL(m, Py_MOD_GIL_NOT_USED);

[lines 286-310 of the text dump]

What Are Critical Sections?¶

Conceptually, critical sections act as a deadlock avoidance layer built on
top of simple mutexes. Each thread maintains a stack of active critical
sections. When a thread needs to acquire a lock associated with a critical
section (e.g., implicitly when calling a thread-safe C API function like
PyDict_SetItem(), or explicitly using macros), it attempts to acquire
the underlying mutex.

Using Critical Sections¶

The primary APIs for using critical sections are:

Py_BEGIN_CRITICAL_SECTION and Py_END_CRITICAL_SECTION -
For locking a single object

Py_BEGIN_CRITICAL_SECTION2 and Py_END_CRITICAL_SECTION2
- For locking two objects simultaneously

These macros must be used in matching pairs and must appear in the same C
scope, since they establish a new local scope.  These macros are no-ops in
non-free-threaded builds, so they can be safely added to code that needs to
support both build types.

A common use of a critical section would be to lock an object while accessing

## https://docs.python.org/3/builtins/threadsafety.html

[lines 97-175 of the text dump]

A function or operation that appears atomic with
respect to other threads - it executes instantaneously from the perspective
of other threads. This is the strongest form of thread safety.

Example: PyMutex_IsLocked() performs an atomic read of the mutex
state and can be called from any thread at any time.

Thread safety for list objects¶

Reading a single element from a list is
atomic:

lst[i]   # list.__getitem__

The following methods traverse the list and use atomic
reads of each item to perform their function. That means that they may
return results affected by concurrent modifications:

item in lst
lst.index(item)
lst.count(item)

All of the above operations avoid acquiring per-object locks. They do not block concurrent modifications. Other
operations that hold a lock will not block these from observing intermediate
states.

All other operations from here on block using the per-object lock.

Writing a single item via lst[i] = x is safe to call from multiple
threads and will not corrupt the list.

The following operations return new objects and appear
atomic to other threads:

lst1 + lst2    # concatenates two lists into a new list
x * lst        # repeats lst x times into a new list
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

# e2-c-api: extracts for Python module E2 (fetched 2026-10-14)

## https://docs.python.org/3/c-api/extension-modules.html

[lines 54-125 of the text dump]

Extension export hook¶

Added in version 3.15: Support for the PyModExport_<name> export hook was added in Python
3.15. The older way of defining modules is still available: consult either
the PyInit function section or earlier versions of this
documentation if you plan to support earlier Python versions.

The export hook must be an exported function with the following signature:

PySlot *PyModExport_modulename(void)¶

For modules with ASCII-only names, the export hook
must be named PyModExport_<name>,
with <name> replaced by the module’s name.

For non-ASCII module names, the export hook must instead be named
PyModExportU_<name> (note the U), with <name> encoded using
Python’s punycode encoding with hyphens replaced by underscores. In Python:

def hook_name(name):
    try:
        suffix = b'_' + name.encode('ascii')
    except UnicodeEncodeError:
        suffix = b'U_' + name.encode('punycode').replace(b'-', b'_')
    return b'PyModExport' + suffix

The export hook returns an array of PySlot entries,
terminated by an entry with a slot ID of 0.
These slots describe how the module should be created and initialized.

This array must remain valid and constant until interpreter shutdown.
Typically, it should use static storage.
Prefer using the Py_mod_create and Py_mod_exec slots
for any dynamic behavior.

The export hook may return NULL with an exception set to signal failure.

It is recommended to define the export hook function using a helper macro:

PyMODEXPORT_FUNC¶

 This macro is available when compiling for the Stable ABI since version 3.15.
Declare an extension module export hook.
This macro:

specifies the PySlot* return type,

adds any special linkage declarations required by the platform, and

for C++, declares the function as extern "C".

For example, a module called spam would be defined like this:

PyABIInfo_VAR(abi_info);

static PySlot spam_slots[] = {
    PySlot_STATIC_DATA(Py_mod_abi, &abi_info),
    PySlot_STATIC_DATA(Py_mod_name, "spam"),
    PySlot_FUNC(Py_mod_init, spam_init_function),
    ...
    PySlot_END
};

PyMODEXPORT_FUNC
PyModExport_spam(void)
{
    return spam_slots;
}

The export hook is typically the only non-static
item defined in the module’s C source.

[lines 231-255 of the text dump]

PyInit function¶

Soft deprecated since version 3.15: This functionality will not get new features,
but there are no plans to remove it.

Instead of PyModExport_modulename(), an extension module can define
an older-style initialization function with the signature:

PyObject *PyInit_modulename(void)¶

Its name should be PyInit_<name>, with <name> replaced by the
name of the module.
For non-ASCII module names, use PyInitU_<name> instead, with
<name> encoded in the same way as for the
export hook (that is, using Punycode
with underscores).

If a module exports both PyInit_<name> and
PyModExport_<name>, the PyInit_<name> function
is ignored.

Like with PyMODEXPORT_FUNC, it is recommended to define the
initialization function using a helper macro:

PyMODINIT_FUNC¶

[lines 307-313 of the text dump]

Legacy single-phase initialization¶

Soft deprecated since version 3.15: Single-phase initialization is a legacy mechanism to initialize extension
modules, with known drawbacks and design flaws. Extension module authors
are encouraged to use multi-phase initialization instead.

However, there are no plans to remove support for it.

## https://docs.python.org/3/extending/first-extension-module.html

[lines 198-201 of the text dump]

>>> import spam
Traceback (most recent call last):
   ...
ImportError: dynamic module does not define module export function (PyModExport_spam or PyInit_spam)

[lines 548-604 of the text dump]

Here is the entire source file, for your convenience:

/// Includes

#include <Python.h>
#include <stdlib.h>     // for system()

/// Implementation of spam.system

static PyObject *
spam_system(PyObject *self, PyObject *arg)
{
   const char *command = PyUnicode_AsUTF8AndSize(arg, NULL);
   if (command == NULL) {
      return NULL;
   }
   int status = system(command);
   PyObject *result = PyLong_FromLong(status);
   return result;
}

/// Module method table

static PyMethodDef spam_methods[] = {
    {
        .ml_name="system",
        .ml_meth=spam_system,
        .ml_flags=METH_O,
        .ml_doc="Execute a shell command.",
    },
    {NULL, NULL, 0, NULL}        /* Sentinel */
};

/// Module slot table

PyABIInfo_VAR(abi_info);

static PySlot spam_slots[] = {
    PySlot_STATIC_DATA(Py_mod_abi, &abi_info),
    PySlot_STATIC_DATA(Py_mod_name, "spam"),
    PySlot_STATIC_DATA(Py_mod_doc, "A wonderful module with an example function"),
    PySlot_STATIC_DATA(Py_mod_methods, spam_methods),
    PySlot_END
};

/// Export hook prototype

PyMODEXPORT_FUNC PyModExport_spam(void);

/// Module export hook

PyMODEXPORT_FUNC
PyModExport_spam(void)
{
   return spam_slots;
}

## https://docs.python.org/3/c-api/stable.html

[lines 47-56 of the text dump]

There are two tiers of C API with different stability expectations:

Unstable API, may change in minor versions without
a deprecation period. It is marked by the PyUnstable prefix in names.

Limited API, is compatible across several minor releases.
When Py_LIMITED_API is defined, only this subset is exposed
from Python.h.

These are discussed in more detail below.

[lines 86-121 of the text dump]

There are two Stable ABIs:

abi3, introduced in Python 3.2, is compatible with
non-free-threaded builds of CPython.

abi3t, introduced in Python 3.15, is compatible with
free-threaded builds of CPython.
It has stricter API limitations than abi3.

Added in version 3.15: abi3t was added in PEP 803

It is possible for an extension to be compiled for both abi3 and
abi3t at the same time; the result will be compatible with
both free-threaded and non-free-threaded builds of Python.
Currently, this has no downsides compared to compiling for abi3t only.

Each Stable ABI is versioned using the first two numbers of the Python version.
For example, Stable ABI 3.14 corresponds to Python 3.14.
An extension compiled for Stable ABI 3.x is ABI-compatible with Python 3.x
and above.

Extensions that target a stable ABI must only use a limited subset of
the C API. This subset is known as the Limited API; its contents
are listed below.

On Windows, extensions that use a Stable ABI should be linked against
python3.dll rather than a version-specific library such as
python39.dll.
This library only exposes the relevant symbols.

On some platforms, Python will look for and load shared library files named
with the abi3 or abi3t tag (for example, mymodule.abi3.so).
Free-threaded interpreters only recognize the
abi3t tag, while non-free-threaded ones will prefer abi3 but fall back
to abi3t.
Thus, extensions compatible with both ABIs should use the abi3t tag.

[lines 159-190 of the text dump]

The macros must be defined before including Python.h.
Since Py_PACK_VERSION is not available at this point, you
will need to use the numeric value directly.
For reference, the values for a few recent Python versions are:

0x30a0000  /* Py_PACK_VERSION(3,10) */
0x30b0000  /* Py_PACK_VERSION(3,11) */
0x30c0000  /* Py_PACK_VERSION(3,12) */
0x30d0000  /* Py_PACK_VERSION(3,13) */
0x30e0000  /* Py_PACK_VERSION(3,14) */
0x30f0000  /* Py_PACK_VERSION(3,15) */

When one of the macros is defined, Python.h will only expose API that is
compatible with the given Stable ABI – that is, the
Limited API plus some definitions that need to be
visible to the compiler but should not be used directly.
When both are defined, Python.h will only expose API compatible with
both Stable ABIs.

Py_LIMITED_API¶

Target abi3, that is,
non-free-threaded builds of CPython.
See above for common information.

Py_TARGET_ABI3T¶

Target abi3t, that is,
free-threaded builds of CPython.
See above for common information.

Added in version 3.15.

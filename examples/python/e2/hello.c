#include <Python.h>

static PyObject *
greet(PyObject *module, PyObject *name)
{
    if (!PyUnicode_Check(name)) {
        PyErr_SetString(PyExc_TypeError, "name must be a str");
        return NULL;
    }
    return PyUnicode_FromFormat("Hello, %U!", name);  /* new reference */
}

static PyMethodDef hello_methods[] = {
    {"greet", greet, METH_O, "Return a greeting."},
    {NULL, NULL, 0, NULL}
};

PyABIInfo_VAR(abi_info);

static PySlot hello_slots[] = {
    PySlot_STATIC_DATA(Py_mod_abi, &abi_info),
    PySlot_STATIC_DATA(Py_mod_name, "hello"),
    PySlot_STATIC_DATA(Py_mod_methods, hello_methods),
    PySlot_DATA(Py_mod_gil, Py_MOD_GIL_NOT_USED),
    PySlot_END
};

PyMODEXPORT_FUNC PyModExport_hello(void);

PyMODEXPORT_FUNC
PyModExport_hello(void)
{
    return hello_slots;
}

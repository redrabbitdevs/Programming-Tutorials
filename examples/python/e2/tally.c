#include <Python.h>

/* tally.count_true(iterable) -> int: how many items are truthy. */
static PyObject *
count_true(PyObject *module, PyObject *iterable)
{
    PyObject *it = PyObject_GetIter(iterable);    /* new reference */
    if (it == NULL) {
        return NULL;                              /* exception is set */
    }
    long total = 0;
    PyObject *item;
    while ((item = PyIter_Next(it)) != NULL) {    /* new reference */
        int truth = PyObject_IsTrue(item);
        Py_DECREF(item);                          /* done with item */
        if (truth < 0) {
            Py_DECREF(it);
            return NULL;
        }
        total += truth;
    }

    Py_DECREF(it);
    if (PyErr_Occurred()) {                       /* iteration failed */
        return NULL;
    }
    return PyLong_FromLong(total);                /* new reference */
}

/* tally.scale(seq, factor=2.0) -> list of floats: each item * factor. */
static PyObject *
scale(PyObject *module, PyObject *args, PyObject *kwargs)
{
    static char *kwlist[] = {"seq", "factor", NULL};
    PyObject *seq;
    double factor = 2.0;                  /* default if not passed */
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "O|d:scale", kwlist,
                                     &seq, &factor)) {
        return NULL;                      /* TypeError is set */
    }
    PyObject *it = PyObject_GetIter(seq);
    if (it == NULL) {
        return NULL;
    }
    PyObject *result = PyList_New(0);
    if (result == NULL) {
        Py_DECREF(it);
        return NULL;
    }

    PyObject *item;
    while ((item = PyIter_Next(it)) != NULL) {
        double x = PyFloat_AsDouble(item);
        Py_DECREF(item);
        if (x == -1.0 && PyErr_Occurred()) {
            goto error;                   /* not a number */
        }
        PyObject *value = PyFloat_FromDouble(x * factor);
        if (value == NULL || PyList_Append(result, value) < 0) {
            Py_XDECREF(value);
            goto error;
        }
        Py_DECREF(value);                 /* the list holds its own */
    }
    if (PyErr_Occurred()) {
        goto error;
    }
    Py_DECREF(it);
    return result;

error:                                    /* one exit for every failure */
    Py_DECREF(it);
    Py_DECREF(result);
    return NULL;
}

static PyMethodDef tally_methods[] = {
    {"count_true", count_true, METH_O, "Count the truthy items."},
    {"scale", (PyCFunction)(void (*)(void))scale,
     METH_VARARGS | METH_KEYWORDS, "Multiply every item by factor."},
    {NULL, NULL, 0, NULL}
};

PyABIInfo_VAR(abi_info);

static PySlot tally_slots[] = {
    PySlot_STATIC_DATA(Py_mod_abi, &abi_info),
    PySlot_STATIC_DATA(Py_mod_name, "tally"),
    PySlot_STATIC_DATA(Py_mod_doc, "Count things, in C."),
    PySlot_STATIC_DATA(Py_mod_methods, tally_methods),
    PySlot_DATA(Py_mod_gil, Py_MOD_GIL_NOT_USED),
    PySlot_END
};

PyMODEXPORT_FUNC PyModExport_tally(void);

PyMODEXPORT_FUNC
PyModExport_tally(void)
{
    return tally_slots;
}

import warnings


def kilometres(miles):
    return miles * 1.609344


_RENAMED = {"to_km": "kilometres"}


def __getattr__(name):
    if name in _RENAMED:
        new = _RENAMED[name]
        warnings.warn(f"{name} is deprecated, use {new}",
                      DeprecationWarning, stacklevel=2)
        return globals()[new]
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")

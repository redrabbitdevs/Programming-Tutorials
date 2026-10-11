def compose(*functions):
    """Return a function that applies the given functions left to right."""

    def run(value):
        for function in functions:
            value = function(value)
        return value

    return run


def apply_twice(function, value):
    return function(function(value))


clean = compose(str.strip, str.lower, str.title)
print(clean("  hELLO wORLD  "))
print(apply_twice(lambda s: s + "!", "hi"))
print(apply_twice(clean, "  x  "))

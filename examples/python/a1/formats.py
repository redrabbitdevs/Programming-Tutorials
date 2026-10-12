from annotationlib import Format, get_annotations


def scale(value: Number, factor: float = 2.0) -> Number:
    return value * factor


print(get_annotations(scale, format=Format.STRING))
refs = get_annotations(scale, format=Format.FORWARDREF)
print(refs["factor"], type(refs["return"]).__name__)
ref = refs["value"]
print(ref.__forward_arg__, ref.evaluate(globals={"Number": int}))
try:
    get_annotations(scale, format=Format.VALUE)
except NameError as error:
    print("VALUE raised NameError:", error)

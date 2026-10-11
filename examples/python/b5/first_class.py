def shout(text):
    return text.upper() + "!"


def whisper(text):
    return text.lower() + "..."


speak = shout
print(speak("hello"))

styles = {"shout": shout, "whisper": whisper}
for name, style in styles.items():
    print(name, style("Hello"))


def apply_twice(func, value):
    return func(func(value))


print(apply_twice(shout, "hi"))
print(apply_twice(lambda n: n * 2, 5))


def make_multiplier(factor):
    def multiply(n):
        return n * factor

    return multiply


triple = make_multiplier(3)
print(triple(14))
print(callable(triple), callable(42))

def lines_of(func):
    code = func.__code__
    lines = {line for _s, _e, line in code.co_lines() if line is not None}
    return sorted(n - code.co_firstlineno for n in lines)


def sample(x):
    y = x + 1
    return y * 2


print(lines_of(sample))

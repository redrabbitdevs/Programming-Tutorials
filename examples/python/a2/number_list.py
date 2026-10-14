import re

NUMBER_LIST = re.compile(r"\d+(?:,\d+)*")


def is_number_list(text):
    return NUMBER_LIST.fullmatch(text) is not None


tests = ["1,2,3", "10", "1,,2", "1,2,", "1" * 50_000 + "x"]
print([is_number_list(t) for t in tests])

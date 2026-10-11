from parsing import parse
from summary import average, best

RAW = """\
ana,82
ben,67
cleo,91
dev,58
"""


def main():
    scores = parse(RAW)
    print(f"Students: {len(scores)}")
    print(f"Average: {average(scores):.1f}")
    print(f"Top: {best(scores)}")


if __name__ == "__main__":
    main()

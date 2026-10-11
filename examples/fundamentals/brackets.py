PAIRS = {")": "(", "]": "[", "}": "{"}


def is_balanced(text):
    stack = []
    for ch in text:
        if ch in "([{":
            stack.append(ch)                 # push
        elif ch in PAIRS:
            if not stack or stack.pop() != PAIRS[ch]:   # pop and compare
                return False
    return not stack                         # leftover openers mean unbalanced


for t in ["{[()]}", "([)]", "((", ")"]:
    print(f"'{t}' ->", "balanced" if is_balanced(t) else "not balanced")

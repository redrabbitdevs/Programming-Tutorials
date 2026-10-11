PAIRS = {")": "(", "]": "[", "}": "{"}


def is_balanced(text):
    stack = []
    for ch in text:
        if ch in "([{":
            stack.append(ch)
        elif ch in PAIRS:
            if not stack or stack.pop() != PAIRS[ch]:
                return False
    return not stack


for t in ["f(a[1], {b: 2})", "if (x { y }", ""]:
    print(f"'{t}' ->", "balanced" if is_balanced(t) else "not balanced")

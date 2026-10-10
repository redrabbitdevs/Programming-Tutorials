def calculate(text):
    parts = text.split()
    if len(parts) != 3:
        return "error: expected 'number operator number'"
    left, op, right = parts
    try:
        a = float(left)
        b = float(right)
    except ValueError:
        return "error: operands must be numbers"
    if op == "+":
        return a + b
    if op == "-":
        return a - b
    if op == "*":
        return a * b
    if op == "/":
        if b == 0:
            return "error: division by zero"
        return a / b
    return f"error: unknown operator {op!r}"


for line in ["6 / 3", "4 / 0", "abc + 1", "5 *", "2 ^ 3", "1.5 * 4"]:
    print(f"{line!r} -> {calculate(line)}")

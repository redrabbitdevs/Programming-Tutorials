from decimal import Decimal


def in_month(expenses, month):
    for expense in expenses:
        if (expense.day.year, expense.day.month) == (month.year, month.month):
            yield expense


def total_by_category(expenses):
    totals = {}
    for expense in expenses:
        totals[expense.category] = totals.get(expense.category, Decimal("0")) + expense.amount
    return totals


def format_expense(expense):
    return f"{expense.day}  {expense.category:<10}{expense.amount:>8.2f}  {expense.note}"


def format_report(totals):
    ranked = sorted(totals.items(), key=lambda item: item[1], reverse=True)
    lines = [f"{category:<10}{amount:>9.2f}" for category, amount in ranked]
    lines.append(f"{'total':<10}{sum(totals.values()):>9.2f}")
    return "\n".join(lines)

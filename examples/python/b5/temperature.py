def celsius_to_fahrenheit(celsius):
    """Convert degrees Celsius to degrees Fahrenheit."""
    return celsius * 9 / 5 + 32


def fahrenheit_to_celsius(fahrenheit):
    """Convert degrees Fahrenheit to degrees Celsius."""
    return (fahrenheit - 32) * 5 / 9


for c in (-40, 0, 37, 100):
    f = celsius_to_fahrenheit(c)
    print(f"{c:>4} C = {f:>5.1f} F")

print(f"{fahrenheit_to_celsius(98.6):.1f}")
print(round(fahrenheit_to_celsius(celsius_to_fahrenheit(21.5)), 6))

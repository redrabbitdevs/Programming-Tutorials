def celsius_to_fahrenheit(celsius):
    """Convert degrees Celsius to degrees Fahrenheit."""
    return celsius * 9 / 5 + 32


def fahrenheit_to_celsius(fahrenheit):
    """Convert degrees Fahrenheit to degrees Celsius."""
    return (fahrenheit - 32) * 5 / 9


print(celsius_to_fahrenheit(100))
print(round(fahrenheit_to_celsius(98.6), 1))
print(round(fahrenheit_to_celsius(celsius_to_fahrenheit(21.5)), 6))

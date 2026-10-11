import textkit
from textkit.formats import table

TEXT = "The cat and the hat. The bat, and the cat!"

print(textkit.normalise("Hello, World! Hello."))
print(textkit.top_words(TEXT, 2))
print(table.render(TEXT, 3))
print(textkit.__name__, table.__name__, table.__package__)

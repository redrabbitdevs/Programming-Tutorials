import unicodedata

composed = "\u00e9"
decomposed = "e\u0301"
print(composed == decomposed, len(composed), len(decomposed))
print(composed == unicodedata.normalize("NFC", decomposed))

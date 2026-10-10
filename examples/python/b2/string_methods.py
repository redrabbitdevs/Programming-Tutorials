line = "  Alice, Bob,Carol  "
print(line.strip())
names = [part.strip() for part in line.split(",")]
print(names)
print(" & ".join(names))

print("report.txt".removesuffix(".txt"))
print("https://example.com".removeprefix("https://"))
print("hello".lstrip("he"))

text = "to be or not to be"
print(text.replace("be", "BE", 1))
print(text.find("not"), text.find("xyz"))
print(text.count("to"))
print(text.startswith("to"), text.endswith("be"))
print("hello world".title(), "Hello".swapcase())
print("straße".lower() == "STRASSE".lower())
print("straße".casefold() == "STRASSE".casefold())
print("a-b-c".split("-", 1))
print("one  two".split(), "one  two".split(" "))
print("42".isdigit(), "4x".isdigit())

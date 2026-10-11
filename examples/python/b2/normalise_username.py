raw = "  Dave   Smith\n"

words = raw.split()
username = "_".join(words).casefold()
print(username)

raw = ["  Alice ", "BOB", "carol\n", "  Dave Smith", "eve  "]

clean = [" ".join(name.split()).casefold().replace(" ", "_") for name in raw]
print(clean)

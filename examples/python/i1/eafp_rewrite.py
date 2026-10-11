settings = {"theme": "dark"}
for key in ["theme", "font"]:
    try:
        print(key, "=", settings[key])
    except KeyError:
        print(key, "is not set")

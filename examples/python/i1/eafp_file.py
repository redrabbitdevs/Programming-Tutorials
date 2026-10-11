try:
    with open("no_such_settings.txt", encoding="utf-8") as file:
        settings = file.read()
except FileNotFoundError:
    settings = "defaults"
print(settings)

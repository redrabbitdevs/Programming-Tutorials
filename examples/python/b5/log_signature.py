def log(level, *messages, **extras):
    print(level, messages, extras)


log("INFO", "started", "ok", user="ada", retry=False)

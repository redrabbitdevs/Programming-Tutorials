def shout(text):
    return text.upper() + "!"


def whisper(text):
    return text.lower() + "..."


styles = {"shout": shout, "whisper": whisper}
for name, style in styles.items():
    print(name, style("Hello"))

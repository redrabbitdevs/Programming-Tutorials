for text in "200 302 404 503 418".split():
    status = int(text)
    match status:
        case 200:
            print(status, "ok")
        case 301 | 302:
            print(status, "redirect")
        case 404:
            print(status, "not found")
        case code if code >= 500:
            print(status, "server error", code)
        case _:
            print(status, "other")

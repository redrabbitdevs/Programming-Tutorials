def describe(status):
    match status:
        case 200:
            return "ok"
        case 301 | 302:
            return "redirect"
        case 404:
            return "not found"
        case code if code >= 500:
            return f"server error {code}"
        case _:
            return "other"


for status in [200, 302, 404, 503, 418]:
    print(status, describe(status))

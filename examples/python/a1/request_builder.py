from typing import Self


class Request:
    def __init__(self, url: str) -> None:
        self.url = url
        self.headers: dict[str, str] = {}

    def header(self, name: str, value: str) -> Self:
        self.headers[name] = value
        return self


class AuthRequest(Request):
    def token(self, token: str) -> Self:
        return self.header("Authorization", f"Bearer {token}")


req = AuthRequest("/me").header("Accept", "json").token("abc")
print(type(req).__name__, req.url, req.headers)

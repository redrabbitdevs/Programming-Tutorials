from case_insensitive import Headers

headers = Headers({"Content-Type": "text/html"})
headers.update({"X-Trace": "a1"})
headers["ACCEPT"] = "*/*"
print(headers["content-type"], "x-trace" in headers, headers.get("Accept"))
del headers["X-TRACE"]
print(sorted(headers))

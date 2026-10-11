def connect(host, port=8080, *, timeout=5, secure=True):
    return f"{host}:{port} timeout={timeout} secure={secure}"


print(connect("example.org"))
print(connect("example.org", 9000, timeout=30))

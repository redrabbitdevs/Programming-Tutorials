from redact import redact

user, password = "ada", "hunter2"
print(redact(t"login {user} with {password}", "password"))
print(redact(t"user={user!r} token={password}", "password"))

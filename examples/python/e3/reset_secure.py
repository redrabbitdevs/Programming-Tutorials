import json
import secrets
import subprocess
import sys

MAILER = "import sys; print('mail to', sys.argv[1])"


def reset_token():
    return secrets.token_urlsafe(32)


def notify(email):
    command = [sys.executable, "-c", MAILER, email]
    result = subprocess.run(command, capture_output=True, text=True,
                            check=True)
    return result.stdout.strip()


def load_session(cookie):
    return json.loads(cookie)


def require_admin(session):
    if not session.get("admin"):
        raise PermissionError("admins only")


print(len(reset_token()))
print(notify("ana@example.com; echo pwned"))
session = load_session('{"user": "ana", "admin": false}')
try:
    require_admin(session)
except PermissionError as error:
    print("PermissionError:", error)

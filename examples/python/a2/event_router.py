import json

events = json.loads("""[
 {"event": "login", "user": "ada"},
 {"event": "purchase", "user": "ada", "items": [{"sku": "A1", "qty": 2}]},
 {"event": "purchase", "user": "bob", "items": []},
 {"event": "logout", "user": "ada", "reason": "timeout"},
 {"event": "logout", "user": "bob"},
 {"event": "ping"}
]""")


def route(event):
    match event:
        case {"event": "login", "user": str(user)}:
            return f"{user} logged in"
        case {"event": "purchase", "user": user, "items": []}:
            return f"{user} sent an empty purchase"
        case {"event": "purchase", "user": user,
              "items": [{"sku": sku, "qty": int(qty)}, *rest]}:
            lines = 1 + len(rest)
            return f"{user} bought {lines} line(s), first: {sku} x{qty}"
        case {"event": "logout", "user": user, "reason": reason}:
            return f"{user} logged out ({reason})"
        case {"event": "logout", "user": user}:
            return f"{user} logged out"
        case {"event": kind}:
            return f"unknown event: {kind}"


for event in events:
    print(route(event))

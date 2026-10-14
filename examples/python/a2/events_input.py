import json

events = json.loads("""[
 {"event": "login", "user": "ada"},
 {"event": "purchase", "user": "ada", "items": [{"sku": "A1", "qty": 2}]},
 {"event": "purchase", "user": "bob", "items": []},
 {"event": "logout", "user": "ada", "reason": "timeout"},
 {"event": "logout", "user": "bob"},
 {"event": "ping"}
]""")

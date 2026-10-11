import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE users (name TEXT, secret TEXT)")
db.execute("INSERT INTO users VALUES ('ada', 'ada-secret')")
db.execute("INSERT INTO users VALUES ('bob', 'bob-secret')")

attacker_input = "nobody' OR '1'='1"

# Unsafe: the input becomes part of the SQL text.
unsafe = "SELECT name FROM users WHERE name = '" + attacker_input + "'"
print("unsafe query:", unsafe)
print("unsafe rows:", db.execute(unsafe).fetchall())

# Safe: the input is passed separately as data.
safe = "SELECT name FROM users WHERE name = ?"
print("safe rows:", db.execute(safe, (attacker_input,)).fetchall())

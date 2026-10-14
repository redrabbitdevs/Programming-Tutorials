from string.templatelib import Interpolation, Template


def sql(template: Template) -> tuple[str, tuple[object, ...]]:
    query = []
    for part in template:
        if isinstance(part, Interpolation):
            query.append("?")
        else:
            query.append(part)
    return "".join(query), template.values


import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE users (name TEXT)")
db.executemany("INSERT INTO users VALUES (?)", [("ada",), ("ben",)])

name = "nobody' OR '1'='1"
query, params = sql(t"SELECT name FROM users WHERE name = {name}")
print(query, params)
print(db.execute(query, params).fetchall())
unsafe = f"SELECT name FROM users WHERE name = '{name}'"
print(db.execute(unsafe).fetchall())

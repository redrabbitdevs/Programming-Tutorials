import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE numbers (n INTEGER)")
for n in range(1, 11):
    db.execute("INSERT INTO numbers VALUES (?)", (n,))

# Declarative: describe the result, not the steps.
row = db.execute("SELECT SUM(n * n) FROM numbers WHERE n % 2 = 0").fetchone()
print("total:", row[0])

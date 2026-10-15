import sqlite3

db = sqlite3.connect(":memory:")  # or a file name such as "shop.db"
db.execute("CREATE TABLE stock (sku TEXT PRIMARY KEY, count INTEGER)")
db.execute("INSERT INTO stock VALUES (?, ?)", ("tea", 4))
db.commit()  # make the insert permanent

sku = "tea"  # values always go in as parameters, never with f-strings
print(db.execute("SELECT count FROM stock WHERE sku = ?", (sku,)).fetchone())

try:
    with db:  # commits if the block succeeds, rolls back if it raises
        db.execute("UPDATE stock SET count = count - 1 WHERE sku = ?", (sku,))
        raise RuntimeError("payment failed")
except RuntimeError as error:
    print("rolled back:", error)
print(db.execute("SELECT count FROM stock WHERE sku = ?", (sku,)).fetchone())
db.close()  # `with db` does not close the connection

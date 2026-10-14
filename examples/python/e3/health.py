import json
import sqlite3


def health(checks):
    """Run each check; any exception marks that check as failed."""
    results = {}
    for name, check in checks.items():
        try:
            check()
            results[name] = "ok"
        except Exception as error:
            results[name] = f"failed: {error}"
    healthy = all(result == "ok" for result in results.values())
    return {"status": "ok" if healthy else "degraded", "checks": results}


db = sqlite3.connect(":memory:")


def disk_space():
    raise OSError("only 2% free")


checks = {"database": lambda: db.execute("SELECT 1")}
print(json.dumps(health(checks)))
checks["disk"] = disk_space
print(json.dumps(health(checks)))

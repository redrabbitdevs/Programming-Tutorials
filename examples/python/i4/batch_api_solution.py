from itertools import batched

user_ids = list(range(1, 11))
calls = 0


def fetch_users(batch):
    """Pretend API call that accepts at most 4 ids at once."""
    global calls
    calls += 1
    assert len(batch) <= 4
    return [f"user{i}" for i in batch]


users = []
for batch in batched(user_ids, 4):
    users.extend(fetch_users(batch))

print(calls, "calls")
print(users)

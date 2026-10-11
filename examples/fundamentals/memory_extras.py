import copy


def add_item(items):
    items.append("new")            # changes the caller's list


def replace_all(items):
    items = ["replaced"]           # re-points the local name only
    return items


basket = ["apple"]
add_item(basket)
print(basket)
replace_all(basket)
print(basket)

# A shallow copy duplicates the outer list but shares the inner ones.
team = [["Ada", "Grace"], ["Linus"]]
shallow = team.copy()
deep = copy.deepcopy(team)
team[0].append("Alan")
print("team:   ", team)
print("shallow:", shallow)
print("deep:   ", deep)


# The classic trap: a default value is created once, then shared by every call.
def collect(item, bucket=[]):
    bucket.append(item)
    return bucket


print(collect("a"))
print(collect("b"))


# The safe form: use None and make a fresh list inside.
def collect_safe(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket


print(collect_safe("a"))
print(collect_safe("b"))

# Multiplying a nested list repeats the reference, not the contents.
grid = [[0] * 2] * 2
grid[0][0] = 1
print(grid)

grid = [[0] * 2 for _ in range(2)]
grid[0][0] = 1
print(grid)

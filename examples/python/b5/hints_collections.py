def average(numbers: list[int]) -> float:
    return sum(numbers) / len(numbers)


def find_user(users: dict[str, int], name: str) -> int | None:
    return users.get(name)


def log(message: str) -> None:
    print("log:", message)


count: int = 0
names: list[str] = ["Ada", "Grace"]

print(average([1, 2, 3, 4]))
print(find_user({"ada": 1}, "ada"), find_user({"ada": 1}, "bob"))
log("done")

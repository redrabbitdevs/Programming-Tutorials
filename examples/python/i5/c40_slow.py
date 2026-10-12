"""A report that is slow for a reason a profiler finds in seconds."""


def load_ids(n):
    return list(range(n))


def is_known(user_id, known):
    return user_id in known  # linear search when known is a list


def count_known(candidates, known):
    return sum(1 for user_id in candidates if is_known(user_id, known))


def build_report():
    known = load_ids(3_000)
    candidates = range(0, 6_000, 2)
    return count_known(candidates, known)


if __name__ == "__main__":
    print(build_report())

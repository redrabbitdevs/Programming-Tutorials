from typing import Literal, assert_never

type Status = Literal["ok", "warn", "fail"]


def colour(status: Status) -> str:
    if status == "ok":
        return "green"
    elif status == "warn":
        return "amber"
    elif status == "fail":
        return "red"
    else:
        assert_never(status)


print([colour(s) for s in ("ok", "warn", "fail")])

def freeze(value):
    match value:
        case dict() | frozendict():
            return frozendict({k: freeze(v) for k, v in value.items()})
        case list() | tuple():
            return tuple(freeze(v) for v in value)
        case set() | frozenset():
            return frozenset(freeze(v) for v in value)
        case _:
            return value


config = {"host": "db", "ports": [80, 443], "tags": {"web"}}
frozen = freeze(config)
print(frozen)
print(hash(frozen) == hash(freeze(config)))
print(frozen | {"host": "db2"})

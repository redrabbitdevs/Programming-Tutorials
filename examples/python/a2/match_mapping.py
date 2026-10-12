events = [
    {"type": "click", "x": 10, "y": 20},
    {"type": "key", "key": "q", "shift": True},
    {"type": "scroll", "dy": -3, "source": "wheel"},
    {"type": "click"},
]

for event in events:
    match event:
        case {"type": "click", "x": x, "y": y}:
            print(f"click at ({x}, {y})")
        case {"type": "key", "key": key}:
            print(f"key {key!r}")
        case {"type": kind, **rest}:
            print(f"unhandled {kind}: {rest}")

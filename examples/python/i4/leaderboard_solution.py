entries = [
    {"name": "Mei", "points": 120, "time": 61.5},
    {"name": "Omar", "points": 150, "time": 70.0},
    {"name": "Lena", "points": 120, "time": 58.2},
    {"name": "Ben", "points": 150, "time": 70.0},
    {"name": "Ana", "points": 90, "time": 40.0},
]

ranking = sorted(entries, key=lambda e: (-e["points"], e["time"], e["name"]))
for place, entry in enumerate(ranking, start=1):
    print(f"{place}. {entry['name']:<5} {entry['points']:>4} {entry['time']:>5.1f}")

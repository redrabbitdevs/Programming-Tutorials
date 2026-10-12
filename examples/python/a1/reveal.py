from typing import reveal_type

scores = [90, 72, 85]
best = max(scores)
reveal_type(scores)
reveal_type(best)
print(best)

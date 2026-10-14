from itertools import chain

batches = [["ada", "ben"], [], ["cy"]]
print([name for batch in batches for name in batch])
print(list(chain.from_iterable(batches)))
print([*batch for batch in batches])

layers = [{"width": 80, "colour": "auto"}, {"width": 100}, {"colour": "never"}]
print({**layer for layer in layers})

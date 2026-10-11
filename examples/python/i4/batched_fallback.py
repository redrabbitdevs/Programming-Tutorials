from itertools import islice


def batched(iterable, n):
    """Same job as itertools.batched, for Python before 3.12."""
    iterator = iter(iterable)
    while batch := tuple(islice(iterator, n)):
        yield batch


for batch in batched(range(1, 8), 3):
    print(batch)

# What's New in Python 3.9: dict merge extract

Fetched 2026-10-11 with `curl -sL https://docs.python.org/3/whatsnew/3.9.html`, trimmed to one section.
Source: https://docs.python.org/3/whatsnew/3.9.html

## Dictionary Merge & Update Operators

Merge (|) and update (|=) operators have been added to the built-in dict class.
Those complement the existing dict.update and {**d1, **d2} methods of merging dictionaries.

    >>> x = {"key1": "value1 from x", "key2": "value2 from x"}
    >>> y = {"key2": "value2 from y", "key3": "value3 from y"}
    >>> x | y
    {'key1': 'value1 from x', 'key2': 'value2 from y', 'key3': 'value3 from y'}
    >>> y | x
    {'key2': 'value2 from x', 'key3': 'value3 from y', 'key1': 'value1 from x'}

See PEP 584 for a full description. (Contributed by Brandt Bucher in bpo-36144.)

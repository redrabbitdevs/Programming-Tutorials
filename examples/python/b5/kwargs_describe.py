def describe(**details):
    print(type(details).__name__, details)
    for key, value in details.items():
        print(f"  {key} -> {value}")


describe(name="Ada", born=1815)

def biggest[T: (int, float, str)](a: T, b: T) -> T:
    return a if a > b else b


print(biggest(3, 7), biggest("pear", "apple"))

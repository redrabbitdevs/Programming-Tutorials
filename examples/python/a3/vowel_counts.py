from concurrent.futures import (
    InterpreterPoolExecutor,
    ProcessPoolExecutor,
    ThreadPoolExecutor,
)


def vowels(word):
    return sum(letter in "aeiou" for letter in word)


if __name__ == "__main__":
    words = ["banana", "sky", "queue"]
    for executor_class in (
        ThreadPoolExecutor,
        ProcessPoolExecutor,
        InterpreterPoolExecutor,
    ):
        with executor_class(max_workers=3) as pool:
            results = list(pool.map(vowels, words))
        print(f"{executor_class.__name__:24} {results}")

from concurrent.futures import InterpreterPoolExecutor

TEXTS = [
    "the quick brown fox",
    "jumps over the lazy dog",
    "concurrency is not parallelism",
    "isolation makes sharing explicit",
]


def stats(text):
    words = text.split()
    return len(words), max(words, key=len)


if __name__ == "__main__":
    with InterpreterPoolExecutor(max_workers=4) as pool:
        for text, (count, longest) in zip(TEXTS, pool.map(stats, TEXTS)):
            print(f"{count} words, longest {longest!r:15} <- {text}")

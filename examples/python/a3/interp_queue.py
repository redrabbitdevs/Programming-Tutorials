from concurrent import interpreters


def count_words(text, queue):
    queue.put((text.split()[0], len(text.split())))


if __name__ == "__main__":
    results = interpreters.create_queue()
    texts = ["red green blue", "one two", "solo"]
    workers = [interpreters.create() for _ in texts]
    threads = [
        interp.call_in_thread(count_words, text, results)
        for interp, text in zip(workers, texts)
    ]
    for thread in threads:
        thread.join()

    print(sorted(results.get() for _ in texts))
    for interp in workers:
        interp.close()

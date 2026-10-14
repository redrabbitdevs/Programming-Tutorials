import threading

basket = []
changed = threading.Condition()


def picker(fruit):
    with changed:
        basket.append(fruit)
        changed.notify_all()  # wake everyone waiting on this condition


def packer():
    with changed:
        changed.wait_for(lambda: len(basket) >= 3)
        print("packing", sorted(basket))


threads = [threading.Thread(target=packer)]
threads += [threading.Thread(target=picker, args=(f,)) for f in ["fig", "kiwi", "lime"]]
for thread in threads:
    thread.start()
for thread in threads:
    thread.join()

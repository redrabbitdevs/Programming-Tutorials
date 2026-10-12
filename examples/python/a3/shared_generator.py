import threading


def ticket_numbers(count):
    for number in range(1, count + 1):
        yield number


tickets = threading.serialize_iterator(ticket_numbers(300))
taken = {name: [] for name in ("ann", "bob", "cy")}


def take_tickets(name):
    for number in tickets:
        taken[name].append(number)


threads = [threading.Thread(target=take_tickets, args=(n,)) for n in taken]
for thread in threads:
    thread.start()
for thread in threads:
    thread.join()

everything = sorted(n for numbers in taken.values() for n in numbers)
print(len(everything), everything == list(range(1, 301)))

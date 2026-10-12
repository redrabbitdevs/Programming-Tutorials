import threading

balance = 0
both_have_read = threading.Barrier(2)


def deposit(amount):
    global balance
    current = balance          # 1. read
    both_have_read.wait()      # force the unlucky schedule
    balance = current + amount  # 2. write


threads = [threading.Thread(target=deposit, args=(1,)) for _ in range(2)]
for thread in threads:
    thread.start()
for thread in threads:
    thread.join()

print("expected 2, got", balance)

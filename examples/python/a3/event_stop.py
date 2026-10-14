import threading

ready = threading.Event()
stop = threading.Event()


def server():
    print("server: listening")
    ready.set()
    while not stop.wait(timeout=0.05):
        pass  # check for work here, then wait again
    print("server: shutting down")


thread = threading.Thread(target=server)
thread.start()
ready.wait()
print("main: server is ready")
stop.set()
thread.join()
print("main: done")

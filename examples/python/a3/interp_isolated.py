from concurrent import interpreters

visits = 0


def visit():
    global visits
    visits += 1
    return visits


def enable_debug(config):
    config["debug"] = True
    return config


if __name__ == "__main__":
    interp = interpreters.create()
    print("sub:", interp.call(visit), interp.call(visit))
    print("main:", visit())

    settings = {"debug": False}
    print(interp.call(enable_debug, settings), settings)
    interp.close()

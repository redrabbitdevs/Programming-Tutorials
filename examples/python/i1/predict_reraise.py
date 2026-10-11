def risky():
    try:
        raise ValueError("first")
    except ValueError:
        print("handling")
        raise
    finally:
        print("cleanup")


try:
    risky()
except ValueError as error:
    print("outer got", error)

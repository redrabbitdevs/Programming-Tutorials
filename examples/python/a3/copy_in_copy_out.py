from concurrent.futures import ProcessPoolExecutor


def tag(order):
    order["status"] = "packed"
    return order


if __name__ == "__main__":
    order = {"id": 7, "status": "new"}
    with ProcessPoolExecutor(max_workers=1) as pool:
        result = pool.submit(tag, order).result()
    print(order)
    print(result)
    print(result == order, result is order)

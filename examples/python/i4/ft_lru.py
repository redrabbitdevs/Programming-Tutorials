from functools import lru_cache


@lru_cache(maxsize=2)
def double(n):
    print("computing", n)
    return n * 2


double(1)
double(2)
double(1)
double(3)
double(2)
print(double.cache_info())

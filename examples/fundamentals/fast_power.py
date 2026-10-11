def power(base, exponent):
    if exponent == 0:
        return 1
    half = power(base, exponent // 2)      # solve one half-sized problem
    if exponent % 2 == 0:
        return half * half
    return half * half * base


print("2^10 =", power(2, 10))
print("3^13 =", power(3, 13))
print("5^0 =", power(5, 0))

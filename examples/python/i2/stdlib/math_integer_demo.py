import math

try:
    from math.integer import comb, gcd, isqrt, lcm  # Python 3.15 and later
except ImportError:
    from math import comb, gcd, isqrt, lcm  # older versions

print(comb(10, 3))
print(gcd(84, 36), lcm(4, 6))
print(isqrt(50))
print(comb(10, 3) == math.comb(10, 3))

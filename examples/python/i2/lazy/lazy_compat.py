import sys

__lazy_modules__ = ["statistics"]

import os
import statistics

print("os loaded:", "os" in sys.modules)
print(statistics.mean([2, 4]))
print("statistics loaded:", "statistics" in sys.modules)

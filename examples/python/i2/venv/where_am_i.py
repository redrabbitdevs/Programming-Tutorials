import sys

if sys.prefix != sys.base_prefix:
    print("virtual environment:", sys.prefix)
else:
    print("base installation:", sys.prefix)

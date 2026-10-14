import sys

print("switch interval:", sys.getswitchinterval(), "seconds")

old = sys.getswitchinterval()
sys.setswitchinterval(0.001)
print("now:", sys.getswitchinterval())
sys.setswitchinterval(old)

import copy
import pickle

MISSING = sentinel("MISSING")

print(MISSING, repr(MISSING), bool(MISSING))
print(MISSING is copy.deepcopy(MISSING))
print(MISSING is pickle.loads(pickle.dumps(MISSING)))
print(MISSING == sentinel("MISSING"))
print(int | MISSING)

import os
import sys

print(os.environ.get("NO_SUCH_VARIABLE_XYZ", "not set"))
print(os.path.join("data", "2026", "report.txt"))
print(os.path.basename("/home/you/notes.txt"))

print(sys.version_info >= (3, 11))
print(len(sys.argv))
print(sys.platform in {"linux", "darwin", "win32"})

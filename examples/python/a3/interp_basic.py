from concurrent import interpreters

interp = interpreters.create()
print("interpreters:", len(interpreters.list_all()))

interp.exec("""
import sys
answer = 6 * 7
print("inside:", answer, sys.version_info >= (3, 14))
""")
interp.exec("print('still there:', answer)")

interp.close()
print("interpreters:", len(interpreters.list_all()))

from print_linter import find_prints

source = """
import logging
print("start")
def run(items):
    for item in items:
        print(item)
    logging.info("done")
    return len(items)
"""
for line in find_prints(source):
    print(f"line {line}: avoid print(), use logging")

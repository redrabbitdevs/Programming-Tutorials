values = [10, 20, 30]      # the list lives on the heap
print("heap:", *values)
# No cleanup: when nothing refers to the list any more, Python frees it.

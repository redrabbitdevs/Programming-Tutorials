def collect(item, bucket=[]):
    bucket.append(item)
    return bucket


print(collect("a"))
print(collect("b"))


# The safe form: use None and make a fresh list inside.
def collect_safe(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket


print(collect_safe("a"))
print(collect_safe("b"))

from operator import itemgetter

scores = [("ada", 90), ("alan", 90), ("grace", 75), ("barbara", 90)]

# Highest score first, then name A to Z. Negate the number...
print(sorted(scores, key=lambda row: (-row[1], row[0])))

# ...or sort twice, least important key first.
step1 = sorted(scores, key=itemgetter(0))
step2 = sorted(step1, key=itemgetter(1), reverse=True)
print(step2)

# Negating cannot work for text. Use two passes there.
by_name_desc = sorted(scores, key=itemgetter(0), reverse=True)
print(sorted(by_name_desc, key=itemgetter(1)))

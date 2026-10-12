from bisect import bisect_left
from operator import itemgetter

events = [(3, "boot"), (8, "login"), (15, "upload"), (21, "logout")]
i = bisect_left(events, 10, key=itemgetter(0))
print(events[i:])

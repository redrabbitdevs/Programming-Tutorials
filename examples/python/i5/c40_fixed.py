import timeit

import c40_slow


def build_report_fast():
    # one change: a set answers "in" in constant time
    known = set(c40_slow.load_ids(3_000))
    candidates = range(0, 6_000, 2)
    return c40_slow.count_known(candidates, known)


assert build_report_fast() == c40_slow.build_report()
slow = min(timeit.repeat(c40_slow.build_report, number=1, repeat=3))
fast = min(timeit.repeat(build_report_fast, number=1, repeat=3))
print("same answer:", build_report_fast() == c40_slow.build_report())
print("faster by at least 5x:", slow > 5 * fast)

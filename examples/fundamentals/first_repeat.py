def first_repeat(nums):
    seen = set()
    for n in nums:
        if n in seen:                # one lookup instead of a scan of everything so far
            print("first repeat:", n)
            return
        seen.add(n)
    print("no repeat")


first_repeat([3, 7, 1, 7, 3])
first_repeat([1, 2, 3])

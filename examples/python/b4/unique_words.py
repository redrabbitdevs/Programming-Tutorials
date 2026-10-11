def words_only_in_first(first, second):
    return sorted(set(first.lower().split()) - set(second.lower().split()))


print(words_only_in_first("The cat sat on the mat", "the dog sat"))

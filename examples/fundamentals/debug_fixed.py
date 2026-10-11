def last_n(items, n):
    return items[len(items) - n:]


def is_adult(age):
    return age >= 18


def add_tag(tag, tags=None):
    if tags is None:
        tags = []
    tags.append(tag)
    return tags


def percent(part, whole):
    return part / whole * 100


def count_vowels(text):
    count = 0
    for ch in text:
        if ch in "aeiou":
            count += 1
    return count


print(last_n([1, 2, 3, 4, 5], 2))
print(is_adult(18))
add_tag("a")
print(add_tag("b"))
print(percent(1, 4))
print(count_vowels("banana"))

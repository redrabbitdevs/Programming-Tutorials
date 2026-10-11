def is_palindrome(text):
    left = 0
    right = len(text) - 1
    while left < right:
        if text[left] != text[right]:
            return False
        left += 1
        right -= 1
    return True


for word in ["racecar", "abca", "noon", "a", ""]:
    print(f"{word!r}: {'yes' if is_palindrome(word) else 'no'}")

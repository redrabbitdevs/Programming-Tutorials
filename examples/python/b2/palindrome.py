def is_palindrome(text):
    cleaned = "".join(ch for ch in text.casefold() if ch.isalnum())
    return cleaned == cleaned[::-1]


print(is_palindrome("Racecar"))
print(is_palindrome("A man, a plan, a canal: Panama"))
print(is_palindrome("Python"))

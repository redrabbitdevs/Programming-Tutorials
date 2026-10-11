def initials(name):
    letters = []
    for word in name.split():
        letters.append(word[0].upper())
    return "".join(letters)


def test_two_words():
    # Arrange
    name = "Ada Lovelace"
    # Act
    result = initials(name)
    # Assert
    assert result == "AL", result


def test_lowercase_input():
    assert initials("grace hopper") == "GH"


def test_extra_spaces():
    assert initials("  alan   turing ") == "AT"


def test_empty_string():
    assert initials("") == ""


tests = [test_two_words, test_lowercase_input, test_extra_spaces, test_empty_string]
for test in tests:
    test()
    print("PASS", test.__name__)

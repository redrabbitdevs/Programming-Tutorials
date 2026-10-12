from duration import parse_duration


def test_seconds_only():
    assert parse_duration("90s") == 90


def test_hours_and_minutes():
    assert parse_duration("1h30m") == 5400


def test_capitals_and_outer_spaces_are_tolerated():
    assert parse_duration(" 2H ") == 7200

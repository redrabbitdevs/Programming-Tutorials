from c36_clock import current_hour


def banner():
    return "Good morning" if current_hour() < 12 else "Good afternoon"

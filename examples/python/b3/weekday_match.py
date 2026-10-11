for day in range(1, 8):
    match day:
        case 6 | 7:
            print(day, "weekend")
        case _:
            print(day, "weekday")

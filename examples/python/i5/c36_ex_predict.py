from unittest.mock import Mock

clock = Mock(side_effect=[10, 20, ValueError("no more ticks")])

print(clock())
print(clock())
try:
    clock()
except ValueError as error:
    print("error:", error)

clock.reset_mock()
print(clock.call_count)

greeter = Mock(return_value="hi")
print(greeter("Ana"), greeter("Ben"))
print(greeter.call_args_list)
print(greeter.call_args.args)

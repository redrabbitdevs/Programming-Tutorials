from unittest.mock import Mock, call

# A Mock accepts any call and remembers it.
sender = Mock()
sender.send("ana@example.com", "Hello")
sender.send("ben@example.com", "Hi")

print(sender.send.call_count)
print(sender.send.call_args)
print(sender.send.call_args_list == [
    call("ana@example.com", "Hello"),
    call("ben@example.com", "Hi"),
])
sender.send.assert_any_call("ben@example.com", "Hi")

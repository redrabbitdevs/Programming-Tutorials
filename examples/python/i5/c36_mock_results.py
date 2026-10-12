from unittest.mock import Mock

sender = Mock()
sender.send("ana@example.com", "Hello")
sender.send("ben@example.com", "Hi")

lookup = Mock(return_value=42)
print(lookup("anything"))

dice = Mock(side_effect=[3, 5, 1])
print(dice(), dice(), dice())

broken = Mock(side_effect=ConnectionError("network down"))
try:
    broken()
except ConnectionError as error:
    print("raised:", error)

try:
    sender.send.assert_called_once()
except AssertionError as error:
    print("assertion:", str(error).splitlines()[0])

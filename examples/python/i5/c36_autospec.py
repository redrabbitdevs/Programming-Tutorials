from unittest.mock import Mock, create_autospec


class Mailer:
    def send(self, to, subject):
        raise RuntimeError("would really send mail")


# A plain Mock accepts any attribute, so a typo goes unnoticed.
loose = Mock()
loose.sned("ana@example.com", "Hi")
print("typo accepted:", loose.sned.called)

# A spec'd mock only has the attributes of the real class.
strict = create_autospec(Mailer, instance=True)
strict.send("ana@example.com", "Hi")
print("send called:", strict.send.called)

try:
    strict.sned("ana@example.com", "Hi")
except AttributeError as error:
    print("AttributeError:", error)

# autospec also checks the signature of each call.
try:
    strict.send("ana@example.com")
except TypeError as error:
    print("TypeError:", error)

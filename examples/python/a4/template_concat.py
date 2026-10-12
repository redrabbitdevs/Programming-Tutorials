from string.templatelib import Interpolation, Template

user = "ada"
greeting = t"Hi {user}" + t"!"
print(greeting.strings, greeting.values)
built = Template("Hi ", Interpolation(user, "user"), "!")
print(built.strings == greeting.strings, built.values)
try:
    t"Hi " + "there"
except TypeError as error:
    print("TypeError:", error)

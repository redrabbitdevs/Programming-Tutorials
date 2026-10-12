from stack import Stack

numbers = Stack[int]()
numbers.push(1)
numbers.push(2)
print(numbers.pop(), len(numbers))

names: Stack[str] = Stack()
names.push("ada")
print(names.pop())

print(Stack.__type_params__)
print(Stack[int], type(numbers).__name__)

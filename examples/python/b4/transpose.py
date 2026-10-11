matrix = [[1, 2, 3], [4, 5, 6]]
transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]
print(transposed)

names = ["Ada", "Ben", "Cy"]
print({name: index for index, name in enumerate(names)})

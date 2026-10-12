from collections import Counter

stock = Counter(apples=5, pears=2)
sold = Counter(apples=3, pears=2, plums=1)

print(stock - sold)
print(stock + sold)
print(stock & sold)
print(stock | sold)
print(stock.total(), sold.total())

left = stock.copy()
left.subtract(sold)
print(left)
print(+left)
print(Counter(apples=2) <= stock)

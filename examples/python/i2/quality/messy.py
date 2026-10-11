import os
import sys
import json

def  average(numbers):
    total=0
    for n in numbers :
        total+=n
    unused = len(numbers)
    return total/len(numbers)

print( average([3,4,5]) )

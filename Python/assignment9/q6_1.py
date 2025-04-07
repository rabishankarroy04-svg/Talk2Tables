import math

def nCr(n, r):
    return math.factorial(n) // (math.factorial(r) * math.factorial(n - r))

def pascals_triangle_nCr(n):
    for i in range(n):
        for j in range(i + 1):
            print(nCr(i, j), end=" ")
        print()

n = int(input("Enter the number of rows for Pascal's triangle: "))

pascals_triangle_nCr(n)

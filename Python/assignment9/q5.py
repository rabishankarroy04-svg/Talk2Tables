def factorial(num):
    if num == 1 or num == 0:  
        return 1
    return num*factorial(num-1)

def permutation(n,r):
    result = factorial(n)/factorial(r)
    return result

def combinatiion(n,r):
    result = factorial(n)/(factorial(r) * factorial(n-r))
    return result

number = int(input("Enter a number:"))
n = int(input("Enter total number of objects(n):"))
r = int(input("Enter number of selected objects(r):"))

print("Factorial of {number}:",factorial(number))
print("nPr :",permutation(n,r))
print("nCr:",combinatiion(n,r))
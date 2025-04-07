def gcd(a, b):
    if b == 0:
        return a
    else:
        return gcd(b, a % b)

def gcd_of_list(numbers):
    if len(numbers) == 1:
        return numbers[0]
    else:
        return gcd(numbers[0], gcd_of_list(numbers[1:]))


numbers = list(map(int, input("Enter the numbers separated by space: ").split()))

result = gcd_of_list(numbers)
print("GCD of the given set of numbers is:", result)

prime_set = set()
for num in range(2, 10):
    is_prime = True
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            is_prime = False
            break
    if is_prime==True:
        prime_set.add(num)

odd_set = {num for num in range(1, 11) if num % 2 != 0}


print("Prime Set:", prime_set)
print("Odd Set:", odd_set)
print("Union:", prime_set | odd_set)
print("Intersection:", prime_set & odd_set)
print("Difference:", prime_set - odd_set)
print("Symmetric Difference:", prime_set ^ odd_set)

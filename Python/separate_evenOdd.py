li = list(range(1,25))
even = []
odd = []

for item in li:
    if item%2==0:
        even.append(item)
    else:
        odd.append(item)
print("Odd numbers:",odd)
print("Even numbers:", even)
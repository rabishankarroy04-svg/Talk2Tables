numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
print("List:",numbers)
frequency = {}

for number in set(numbers):
    frequency[number] = numbers.count(number)

print("Frequency of each number in the list:")
for number, count in frequency.items():
    print(f"Number {number}: {count} times")

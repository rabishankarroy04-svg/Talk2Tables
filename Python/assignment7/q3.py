
my_list = [1, 2, 3, (4, 5), 6, 7]
count = 0

for element in my_list:
    if isinstance(element, tuple):
        break
    count += 1

print("Number of elements before encountering a tuple:", count)

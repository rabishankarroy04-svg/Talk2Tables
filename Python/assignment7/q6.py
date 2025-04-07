arr = [10, 20, 30, 40, 50]
target = 30
low = 0
high = len(arr) - 1

print("Enter 1 for Linear Search \nEnter 2 for Binary Search")
temp = int(input("Your choice: "))

if temp == 1:
    index = -1
    for i in range(len(arr)):
        if arr[i] == target:
            index = i
            break

    if index != -1:
        print(f"Linear Search: Element {target} found at index {index}")
    else:
        print(f"Linear Search: Element {target} not found")

elif temp == 2:
    index = -1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            index = mid
            break
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    if index != -1:
        print(f"Binary Search: Element {target} found at index {index}")
    else:
        print(f"Binary Search: Element {target} not found")

else:
    print("Enter a Valid Input")

stack = []

num = int(input("Number of elements in stack:"))
for i in range(num):
	item=input(f"Enter item {i+1}: ")
	stack.append(item)

print("Stack after pushing items:", stack)

if stack:
    print("Top item is:", stack[-1])
else:
    print("Stack is empty.")


if stack:
    print("Popped item:", stack.pop())
else:
    print("Stack is empty.")
print("Stack after poping item:", stack)
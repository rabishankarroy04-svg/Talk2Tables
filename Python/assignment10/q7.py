n=5

for i in range(1,n+1):
	for j in range(1,i+1):
		print("*",end="")
	print()

print()

for i in range(1,n+1):
	for j in range(1,n-i+1):
		print(" ",end="")
	for k in range(n-i+1,n+1):
		print("*",end="")
	print()

print()

for i in range(1, n + 1):
        for j in range(n - i):
            print(" ", end="")
        
        for k in range(1, 2*i):
            print("*", end="")
        print()

print()

for i in range(0, n):
        num = 1
        for j in range(0, i+1):
            print(num, end=" ")
            num = num + 1
        print("")

print()

num = 1
for i in range(0, n):
        for j in range(0, i+1):
            print(num, end=" ")
            num = num + 1
        print("")

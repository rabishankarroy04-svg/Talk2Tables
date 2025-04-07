a=1
b=2

print("Fibonacci numbers from 1 to 1000:")
numbers=[]
while a<=1000:
	if a>0:
		numbers.append(a)
	a,b=b,a+b
print(numbers,end=" ")
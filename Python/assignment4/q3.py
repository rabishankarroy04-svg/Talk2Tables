import math

print("Armstrong numbers between 1 to 1000:")
for i in range(1,1001):
	sum=0
	digit=0
	temp=i
	while temp>0:
		digit=digit+1
		temp=temp//10
	temp=i
	while temp>0:
		rem=temp%10
		sum=sum+pow(rem,digit)
		temp=temp//10

	if i==sum:
		print(i,end=" ")
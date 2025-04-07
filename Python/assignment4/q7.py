total_sum,count=0,0
numbers=[]

while True:
	li = input("Enter a number:").strip()

	if li.lower()=='done':
		break

	try:
		number=float(li)
		numbers.append(number)
		total_sum = total_sum + number
		count = count + 1
		
	except ValueError:
		print("Invalid Input.")

if count>0:
	avg=total_sum/count
	max_value=max(numbers)
	min_value=min(numbers)
	print(f"Maximum of the numbers:{max_value}")
	print(f"Minimum of the numbers:{min_value}")
	print(f"Average of the numbers:{avg}")
else:
	print("No valid numbers were entered.")

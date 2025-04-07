total_sum,count = 0,0

while True:
	li = input("Enter a number:").strip()

	if li.lower()=='done':
		break

	try:
		number=float(li)
		total_sum = total_sum + number
		count = count + 1
	except error:
		print("Invalid Input.")

if count>0:
	avg=total_sum/count
	print(f"Total sum of the numbers:{total_sum}")
	print(f"Count of the numbers:{count}")
	print(f"Average of the numbers:{avg}")
else:
	print("No valid numbers were entered.")
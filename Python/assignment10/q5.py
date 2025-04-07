import calendar

year=int(input("Enter Year:"))
print("Leap Year." if calendar.isleap(year) else "Not A Leap Year.")

range1=int(input("Enter starting range(year):"))
range2=int(input("Enter ending range(year):"))

count=0
for i in range(range1,range2):
	if calendar.isleap(i):
		count=count+1
	else:
		continue
print("Leap Years in the range:",count)
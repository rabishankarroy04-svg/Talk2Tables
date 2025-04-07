num=int(input("Enter a 3 digit number:"))
sum=0
temp=num
while (temp>0):
    rem=temp%10
    sum=sum+rem**3
    temp=temp//10

if num==sum:
    print(str(num)+" is an Armstrong number.")
else:
    print(str(num)+" is not an Armstrong number.")
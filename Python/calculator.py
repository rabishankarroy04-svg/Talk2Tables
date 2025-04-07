first_number=input("Enter the first number: ")
operator=input("Enter any operator(+,-,/,*,%):")
second_number=input("Enter the second number:")

first_number=int(first_number)
second_number=int(second_number)
if operator=="+":
    print(first_number+second_number)
elif operator=="-":
    print(first_number-second_number)
elif operator=="/":
    print(first_number/second_number)
elif operator=="%":
    print(first_number%second_number)
elif operator=="*":
    print(first_number*second_number)
else:
    print("Invalid Operation.")

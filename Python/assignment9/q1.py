def non_recursive(num):
    fact=1
    for i in range(1,num+1):
        fact=fact*i
    
    return fact

def recursive(num):
    if num == 1 or num == 0:  
        return 1
    return num*recursive(num-1)

def case(argument,number):
    match argument:
        case 1:
            print("factorial of the number:",recursive(number)) 
        case 2:
            print("factorial of the number:",non_recursive(number))
try:
    number = int(input("Enter a number: ")) 
    print("\n1 for recursive method\n2 for non-recursive method")
    option = int(input("Enter your choice: ")) 
    
    case(option, number)

except ValueError:
    print("Please enter a valid number.")
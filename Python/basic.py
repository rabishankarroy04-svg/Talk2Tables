name="Kathakali"
age=19
print(name)
print(age)

name="Kathakali"
age=19
name="Tonny"
age=20
print(name)
print(age)

first_name="Kathakali"
last_name="Das"
age=19
adult=True
print(first_name+" "+last_name)
print(age)
print(adult)

# name = input("What is your name? ")
# print("Hello " + name)
# print("Welcome to our cool Python class")

# superhero=input("What is your superhero name?");
# print(superhero)

# old_age=input("Enter your old age:")
# new_age=int(old_age)+2
# print(new_age)

# number=18
# print(float(18))

first=input("Enter first number:")
second=input("Enter second number:")
sum=first+second
print("The sum is: "+sum)
sum=int(first)+int(second)
print("The sum is: "+str(sum))

name="Tony Stark"
print(name.upper())
print(name.lower())
print(name.find('S')) #it'll return the index of the finding character
print(name.find('s')) #because it is not in the string

print(name.replace("Tony Stark","Iron Man"))
print(name.replace("T","M"))
print('T' in name)
print('x' in name)

print(5+2)
print(5-2)
print(5*2)
print(5/2)
print(5//2) #to get the only integer part as output
print(5%2)
print(5**2) #to calculate the power

# i=5
# i=i+2
# i+=2

print(3>=2)
print(3<=2)
print(3!=2)
print(3==2)
print(not 2>3)

Age=input("Enter your Age:")
Age=int(Age)
if Age>=18:
    print("You're adult. You can vote.")
elif Age<18 and Age>3:
    print("You're in school")
else:
    print("You're a kid")
print("Thank you")

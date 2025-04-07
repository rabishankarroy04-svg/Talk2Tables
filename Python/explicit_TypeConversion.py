#int() : used to convert object of one type to integer type 
#syntax:int(value,base)

x='110'
print(x)
print(type(x))

x='110'
x=int(x,2)   #we are asking python to treat this value as binary numbers
print(x)
print(type(x))

x=int(x)
print(x)
print(type(x))

#float() : used to convert object of one type to float type
#syntax:float(value)

x=78
x=float(x)
print(x)
print(type(x))

y='3.14159'
y=float(y)
print(y)
print(type(y))

z='0078.90'
z=float(z)
print(z)
print(type(z))

#str() : used to convert object of one type to string type
#syntax:str(value)

x=198
x=str(x)
print(x)
print(type(x))

x=10
y=20
total=x+y
print("The total is:" + str(total))
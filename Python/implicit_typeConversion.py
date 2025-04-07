#Hypothetical Rule of Conversion: Higher data type is converted to lower data type.

print(5+10.98)
print(10/5)
print(10.5/0.5)

# x=10
# y=20
# total=x+y
# print("The total is:" + total)
#Python will not implicitly convert integer to string as program may crash.

x=10
y=20
total=x+y
print("The total is:" + str(total))
#Interpolation is the insertion of something of a different nature into something else.

# percentage(%) formatting : the oldest technique to insert a object into a string
name = "Jaspreet" 
print("My name is %s." % (name) )

name = "Jaspreet" 
city = "Delhi"
print("My name is %s and I live in %s." % (name,city) )

# str.format() function :
name = "Jaspreet" 
city = "Delhi"
print("My name is {} and I live in {}." .format(name, city))

n = "Jaspreet" 
c = "Delhi"
print("My name is {name} and I live in {city}." .format(name=n , city=c))

name = "Jaspreet" 
city = "Delhi"
print("My name is {0} and I live in {1}." .format(name, city))

#format specifiers like f for float,b for binary,d for integer can be used.
print("I got {0:f}% marks in English." .format(55.66))
# first value in the format method will be treated as a float.

print("I got {0:f}% marks in English." .format(55))

#print("I got {0:f}% marks in English." .format('55')) 
#it'll through an error as a string is provided in place of float.

print("I got {0:.2f}% marks in English." .format(55.657453))
print("I got {0:.3f}% marks in English." .format(55.657453))

#f-string: syntax: f"string{object}" OR F"string{object}"
name = "Jaspreet" 
city = "Delhi"
print(f"My name is {name} and I live in {city}.")
print(F'My name is {name} and I live in {city}.')

#call to method
name = "Jaspreet" 
city = "Delhi"
print(f"My name is {name.upper()} and I live in {city.upper()}.")

#multiline f-strings
name = "Jaspreet" 
age = 29
gender = "male"
introduction = (f"My name is {name}." f"My age is {age}." f"I am a {gender}.")
print(introduction)

name = "Jaspreet" 
age = 29
gender = "male"
introduction = (f"""My name is {name}.My age is {age}. I am a {gender}.""")
print(introduction)

#any type of quotation marks can be used .
print(f"{'jaspreet'}")
print(f'{"jaspreet"}')
print(f"""jaspreet""")
print(f'''jaspreet''')

#backslash can be used to escape quotation mark
print(f"I am \"jaspreet\" and I live in \"Delhi\".")

#output should include {}
x=10
y=20
print(f"The result of x+y is {x+y}.")
print(f"The result of {{x+y}} is {x+y}.")
print(f"The result of x+y is {{{x+y}}}.")
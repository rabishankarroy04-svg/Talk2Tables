#strip() method : it can remove any leading and trailing characters.
print("Hello World".strip())
print("###Hello World###".strip('#'))
print(" ###Hello World###".strip('#'))
print("Hello World".strip('ldoH'))
print("Hello World".strip('ldoh'))

#lstrip() method : it removes the leading whitespace only.
print("   Hello World   .".lstrip())

#rstrip() method : it removes the trailing whitespace only.
print("   Hello World   ".rstrip())

#here any change doesn't happened cause we're passing an empty string.
print("   Solving any problem is an art.  ".strip(''))

str = 'I am Jaspreet  .'
print(str.lstrip('I am.'))
print(str.rstrip('I am.'))
print(str)

#split() method : used to split into a list. 
# syntax : string.split(separator,maxsplit)
print("Hello!$I$am$Jaspreet".split('$',maxsplit=2))
print("Hello! I am Jaspreet".split())

#rsplit() method : used to split the string from the right.
print("Hello!$I$am$Jaspreet".rsplit('$',maxsplit=2))
print("Hello! I am Jaspreet".rsplit())

#join() method : used to join the elements of a iterable.An iterable is an object which is capable of returning its members one at a time.List,Dictionary,tuple,set and string are the iterables.
#syntax : separator.join(iterable)
l1=['H','e','l','l','o']
print(''.join(l1)) #we are providing empty string as separator as we don't want any separator

l2=['I','am','Rockey']
print(' '.join(l2))

l3=['name','of','a','variable']
print('_'.join(l3))

#if we're joining a dictionary it'll join the keys of the dictionary not the values.
d = {'name': 'Adam','country': 'America'}
print(' and '.join(d))

#replace() method: to replace a string with another string.
#Syntax : string.replace(oldString,newString,count)
s="I love to eat grapes"
print(s.replace('grapes','mangoes'))
print(s.replace(' ','-',2))

s1="Neso3Academy3is3the3best3Academy."
print(s1.replace('3',' '))

#upper() method : to convert all letters of the string to uppercase.
#Syntax: string.upper()
print("Hello! I am Jaspreet".upper())

#lower() method : to convert all letters of the string to lowercase.
#Syntax: string.lower()
print("Hello! I am Jaspreet".lower())

#capitalize() method : to convert first character in uppercase and the rest in lowercase.
#Syntax: string.capitalize()
print("maruti suzuki".capitalize())
print("29maruti suzuki".capitalize())

#isupper() method : it returns TRUE if all characters are upper , otherwise returns FALSE.
#Syntax: string.isupper()
print("maruti suzuki".isupper())

#islower() method : it returns FALSE if all characters are upper , otherwise returns TRUE.
#Syntax: string.islower()
print("maruti suzuki".islower())

#isalpha() Method :it returns TRUE if all characters are Alphabet.
#Syntax: string.isalpha()
print("hello2".isalpha())
print("hello! I am jaspreet.".isalpha())
print("HelloIamJaspreet".isalpha())

#isnumeric() Method :it returns TRUE if all characters are Alphabet.
#Syntax: string.isnumeric()
print("23456".isnumeric())
print("3.14157".isnumeric())
print("-3425".isnumeric())

#isalnum() Method :it returns TRUE if all characters are alphanumeric.
#Syntax: string.isalnum()
print("232425".isalnum())
print("jaspreet".isalnum())
print("Hello I am Jaspreet".isalnum())

print("2004kathakali@gmail.com".islower())
print("2004kathakali@gmail.com".upper())
print("2004kathakali@gmail.com".isalnum())

#count() method: to find number of occurrences of a substring in given string.If substring is not found,then it returns 0.
#syntax: string.count(sub,start,end) ||start and end means start index and end index
print("I love fruits, Fruits make me healthy".count('fruits'))
print("I love fruits, fruits make me healthy".count('fruits',3,13))
print("I love fruits, fruits make me healthy".count('fruits',0,5))

#find() method: returns the index of the first occurrence of the substring.If substring is not found,then it returns -1.
#syntax: string.find(sub,start,end) ||start and end means start index and end index
print("Python is a beautiful language".find('b'))
print("Python is a beautiful language".find('b',1,5))

#rfind() method: returns the index of the last occurrence of the substring.If substring is not found,then it returns -1.
#syntax: string.rfind(sub,start,end) ||start and end means start index and end index
print("Python is a beautiful language".rfind('e'))
print("Python is a beautiful language".rfind('e',1,5))

#index() method: same as find() method.If substring is not found,then it raises an exception(ValueError).
#syntax: string.index(sub,start,end) ||start and end means start index and end index
print("Python is a beautiful language".index('e'))
#print("Python is a beautiful language".index('e',1,5))

#rindex() method: same as rfind() method.If substring is not found,then it raises an exception(ValueError).
#syntax: string.rindex(sub,start,end) ||start and end means start index and end index
print("Python is a beautiful language".rindex('e'))
#print("Python is a beautiful language".rindex('e',1,5))

print("This is a string".rindex('i'))
print("I love python".index('p'))
print("I love python".count('o'))

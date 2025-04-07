my_dictionary = {'Fruit':'Mango','Flower':'Jasmine','Number':5}
print(my_dictionary)

item = input("Enter item to be searched:")
count=0

try:
	num=int(item)
	if num in my_dictionary.values():
		print(f"{item} is present in the dictionary")
	else:
		print(f"{item} is not present in the dictionary")
except ValueError:
	if item in my_dictionary.values():
		print(f"{item} is present in the dictionary")
	else:
		print(f"{item} is not present in the dictionary")
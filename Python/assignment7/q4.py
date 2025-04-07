# Define a tuple
my_tuple = (10, 20, 30, 40, 50, 30)

item = 30
try:
    index = my_tuple.index(item)
    print(f"Index of {item}:", index)
except ValueError:
    print(f"{item} is not in the tuple.")

my_string = "hello"
string_to_tuple = tuple(my_string)
print("Tuple converted from string:", string_to_tuple)


item = 'l'
try:
    index_with_start_stop = string_to_tuple.index(item, 2, 5)
    print(f"Index of '{item}' between index 2 and 5:", index_with_start_stop)
except ValueError:
    print(f"'{item}' is not found between index 2 and 5 in the tuple.")


item = 100
try:
    index_not_found = my_tuple.index(item)
    print(f"Index of {item_not_in_tuple}:", index_not_found)
except ValueError:
    print(f"{item_not_in_tuple} is not in the tuple.")

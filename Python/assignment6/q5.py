list1 = [1, 2, 3, 4, 5]
list2 = [4, 5, 6, 7, 8]
print("List1:",list1)
print("List2:",list2)

are_equal = list1 == list2
print(f"Are the two lists equal? {are_equal}")

common_elements = set(list1) & set(list2)
print(f"Common elements: {common_elements}")

unique_to_list1 = set(list1) - set(list2)
print(f"Elements unique to list1: {unique_to_list1}")

unique_to_list2 = set(list2) - set(list1)
print(f"Elements unique to list2: {unique_to_list2}")

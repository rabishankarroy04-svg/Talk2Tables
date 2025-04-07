def print_numbers(*args):
    print("Numbers:")
    for number in args:
        print(number)

def print_info(**args):
    print("\nInformation:")
    for key, value in args.items():
        print(f"{key}: {value}")


print_numbers(1, 2, 3)

print_info(name="Alice", age=25, city="New York")


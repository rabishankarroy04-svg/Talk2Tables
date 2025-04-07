# Function to count local variables
def count_local_variables():
    a = 10
    b = 20
    c = "Hello World"
    return len(locals())

print("Number of local variables:", count_local_variables())

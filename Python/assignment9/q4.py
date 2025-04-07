def factors(num):
    arr=[]
    for i in range(1,num):
        if (num%i==0):
            arr.append(i)
    return arr

num = int(input("Enter a number:"))
result = factors(num)
print(f"Factors of {num}: ",result)
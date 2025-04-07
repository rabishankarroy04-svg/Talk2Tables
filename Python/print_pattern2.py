rows=int(input("Enter the number of rows:"))
#no. of white spaces before the star=(number of rows-row number)
for i in range(1,rows+1):
    for space in range(1,rows-i+1):
       print(end=' ')
    for star in range(1,i+1):
       print("*", end=' ')
    print('')
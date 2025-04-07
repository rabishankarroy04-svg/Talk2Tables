
def pascals_triangle(n):
    triangle = []
    
    for i in range(n):
        row = [1]
        
        if i > 1:
            for j in range(1, i):
                row.append(triangle[i - 1][j - 1] + triangle[i - 1][j]) 
        
        triangle.append(row)

        if i > 0: 
            row.append(1)
        
        for num in row:
            print(num, end=" ")
        print()  


n = int(input("Enter the number of rows for Pascal's triangle: "))
pascals_triangle(n)

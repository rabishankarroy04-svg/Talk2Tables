numbers= range(5) #0,1,2,3,4
print(numbers)

# i=1
# # while i<=5:
# #     print(i)
# #     i+=1 # means i=i+1
# while i<=5:
#     print(i*"*")
#     i+=1 # means i=i+1

# i=5
# while i>=0:
#     print(i*"*")
#     i-=1 # means i=i+1

for i in range(5):
    print(i+1)
    # print(i*"*")

marks= [90,80,70,"maths"]
print(marks)
print(marks[1])
print(marks[-1]) #it'll count from end
print(marks[-2])
print(marks[0:2]) 
print(marks[1:3])

for score in marks:
    print(score)

marks.append(99) #adding element at last
print(marks)
marks.insert(3,99)
print(marks)
print(99 in marks)
print(20 in marks)
print(len(marks)) #how many elements

marks.clear()
print(marks)
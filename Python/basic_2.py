#List
students= ["ram","rahim","grey","lalita"]

for student in students:
    if student == "grey":
        break;
    print(student)

for student in students:
    if student == "grey":
        continue;
    print(student)

#Tupple
    
marks=(95,98,97)
# marks[0]=99  #this will not be considered as tupples are immutable
print(marks.count(97))
print(marks.index(97))

#sets : only stores unique values

marks={95,98,97,97,97}
print(marks) #97 will not show repeatedly as sets don't have any idea about index
for score in marks:
    print(marks)
person = "ram" , "shyam" , "rani"
print(person)

#dictionary
marks={"english":90,"chemistry":78}
print(marks["chemistry"])
marks["physics"]=70
print(marks)
marks["physics"]=71
print(marks)


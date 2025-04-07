dict1={'a':10,'b':5,'c':1}
dict2={'x':6,'y':50,'z':11}
dict3={'p':0,'q':15,'r':7}

print("dict1:",dict1)
print("dict2:",dict2)
print("dict3:",dict3)

merged_dict={}
for key,value in dict1.items():
	merged_dict[key]=value

for key,value in dict2.items():
	merged_dict[key]=value

for key,value in dict3.items():
	merged_dict[key]=value

print("Merged Dictionary:")
print(merged_dict)
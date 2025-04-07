list1=['LightBlue','Yellow','White','Purple']
list2=['#ADD8E6','#FFFF00','#FFFFFF','#800080']

print("Original Key List :"+str(list1))
print("Original Value List :"+str(list2))

print("Resultant Dictionary:")
colors={list1[i]:list2[i] for i in range(len(list1))}
print(colors)

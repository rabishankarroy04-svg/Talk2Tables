#include<stdio.h>
#include <stdlib.h>

typedef struct Node{
	int data;
	struct Node *next;
}stdnode;

stdnode* createNode(int data) {
    stdnode *newNode = (stdnode *)malloc(sizeof(stdnode));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

int search_list(stdnode *start ,int num){
	stdnode *temp=start;
	while(temp != NULL){
		if(temp->data == num)
			return 1;
		temp=temp->next;
	}
 return 0;
}

void traverse_list(stdnode *start){
	while(start != NULL){
		printf("%d|%d -> ",start->data,start->next);
		start=start->next;
	}
}

void sort_list(stdnode *head){
	 stdnode *current = head, *index = NULL;  
        int temp;  
          
        if(head == NULL) {  
            return;  
        }  
        else {  
            while(current != NULL) {  
                //Node index will point to node next to current  
                index = current->next;  
                  
                while(index != NULL) {  
                    //If current node's data is greater than index's node data, swap the data between them  
                    if(current->data > index->data) {  
                        temp = current->data;  
                        current->data = index->data;  
                        index->data = temp;  
                    }  
                    index = index->next;  
                }  
                current = current->next;  
            }      
        }  
    }  

void display(stdnode **start){
  stdnode *temp = *start;
  while(temp != NULL){
    printf("%d|%d -> ",temp->data,temp->next);
    temp = temp->next;
  }
  printf("NULL");
}

int menu(){
    int x;
    printf("\nMENU:\n1.Search data in the Linked list\n2.Sort datas in linked list\n3.Traverse the Linked List\n4.Exit\n");
    printf("Your Choice:");
    scanf("%d",&x);
    return x;
}

int main(){
	int choice,result,num,i;
	stdnode *start= createNode(50);
	start->next= createNode(20);
	start->next->next= createNode(30);
	start->next->next->next= createNode(40);
	printf("\nLinked List:");
	display(&start);
	
	while(1){
		choice = menu();
		switch(choice){
			case 1:
				printf("\nEnter the element you want to search:");
				scanf("%d",&num);
				result=search_list(start,num);
				
				if(result==1)
					printf("\n%d is present in the Linked List.",num);
				else
					printf("\n%d is not present in the Linked List.",num);
				break;
			
			case 2:
				printf("\nSorting Done.");
				sort_list(start);
				printf("\nSorted List:");
				display(&start);
				break;
			
			case 3:
				traverse_list(start);
				break;
				
			case 4:
				exit(0);
				
			default:
				printf("Enter a valid Option from MENU & Try Again.");
		}
	}
 return 0;
}

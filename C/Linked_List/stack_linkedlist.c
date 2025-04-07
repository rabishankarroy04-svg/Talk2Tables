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

void push_element(stdnode **start,int val){
	stdnode *newNode = (stdnode *)malloc(sizeof(stdnode));
  	if(newNode == NULL){
	    printf("Memory is not allocated");
	    return;
  	}
 	newNode->data = val;
  	newNode->next = *start;
    *start = newNode;
}

int pop_element(stdnode **start){
  if(*start == NULL){
    printf("Linkedlist is empty");
    return -99;
  }
  stdnode *temp = *start;
  int val = temp->data;   //start->info   
  *start = (*start)->next;
  free(temp);
  return val;  
}

int peek_element(stdnode **start){
  if(*start == NULL){
    printf("Linkedlist is empty");
    return -99;
  }
  stdnode *temp = *start;
  int val= temp ->data;
  return val;
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
    printf("\nMENU:\n1.Push Element\n2.Pop Element\n3.Peek Element\n4.Display Stack\n5.Exit\n");
    printf("Your Choice:");
    scanf("%d",&x);
    return x;
}

int main(){
	int choice,result,val,i;
	stdnode *start= createNode(50);
	start->next= createNode(20);
	start->next->next= createNode(30);
	start->next->next->next= createNode(40);
	printf("\nStack:");
	display(&start);
	
	while(1){
		choice = menu();
		switch(choice){
			case 1:
				printf("\nEnter the value to be inserted:");
				scanf("%d",&val);
				push_element(&start,val);
				break;
			
			case 2:
				val = pop_element(&start);
      			if(val != -99)
       				printf("\nDeleted Element: %d", val);
      			break;
			
			case 3:
				val = peek_element(&start);
				if(val != -99)
					printf("\nTop Element: %d", val);
				break;
			
			case 4:
				display(&start);
				break;
				
			case 5:
				exit(0);
				
			default:
				printf("Enter a valid Option from MENU & Try Again.");
		}
	}
 return 0;
}

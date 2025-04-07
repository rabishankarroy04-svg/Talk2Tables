#include <stdio.h>
#include<stdlib.h>
typedef struct s {
  int info;
  struct s *next;
}Node;

void insertAtEnd(Node **start, int val){
  Node *newNode = (Node *) malloc (sizeof(Node));
  if(newNode == NULL){
    printf("Memory is not allocated");
    return;
  }
  newNode->info = val;
  newNode->next = NULL;
  if(*start == NULL){
      *start = newNode;
      return;
  }
  Node *temp = *start;
  while(temp->next != NULL){
    temp = temp->next;  
  }
  //temp is at last node
  temp->next = newNode;
}

void insertAtBeg(Node **start,int val){
	Node *newNode = (Node *) malloc (sizeof(Node));
  	if(newNode == NULL){
    printf("Memory is not allocated");
    return;
  	}
  	newNode->info = val;
  
  	newNode->next = *start;
	*start = newNode;
}

int deleteAtBeg(Node **start){
  if(*start == NULL){
    printf("Linkedlist is empty");
    return -99;
  }
  Node *temp = *start;
  int val = temp->info;   //start->info   
  *start = (*start)->next;
  free(temp);
  return val;  
}

void display(Node **start){
  Node *temp = *start;
  while(temp != NULL){
    printf("%d|%d -> ",temp->info,temp->next);
    temp = temp->next;
  }
  printf("NULL");
}

int menu(){
    int x;
    printf("\nMENU:\n1.InsertAtEnd\n2.DeleteAtBeginning\n3.Display\n4.Terminate\n");
    printf("Your Choice:");
    scanf("%d",&x);
    return x;
}

int main(){
    Node *start = NULL;
    int val, choice;
    
    while(1){
        choice = menu();
      switch(choice){
      case 1:
        printf("Enter a value to be inserted: ");
        scanf("%d",&val);
        insertAtEnd(&start, val);
        break;
           
      case 2:
      	printf("Enter a value to be inserted: ");
        scanf("%d",&val);
        insertAtBeg(&start,val);
        
      case 3:
      val = deleteAtBeg(&start);
      if(val != -99)
       printf("The deleted value is: %d", val);
      break;
      
      case 4:
      display(&start);
      break;
      
      case 5:
      exit(0);
      }
    }
  return 0;
}

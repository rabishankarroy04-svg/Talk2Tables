#include<stdio.h>
#include <stdlib.h>

struct node {
    int data;
    struct node* next;
};


struct node* createNode(int data) {
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}


	void AtBeginning(struct node** head, int data) {
	    struct node* newNode = createNode(data);
	    newNode->next = *head;
	    *head = newNode;
	}
	
	
	void AtEnd(struct node** head, int data) {
	    struct node* newNode = createNode(data);
	    if (*head == NULL) {
	        *head = newNode;
	        return;
	    }
	    struct node* temp = *head;
	    while (temp->next != NULL) {
	        temp = temp->next;
	    }
	    temp->next = newNode;
	}
	
	
	void AfterNode(struct node* prevNode, int data) {
	    if (prevNode == NULL) {
	        printf("Given node cannot be null\n");
	        return;
	    }
	    struct node* newNode = createNode(data);
	    newNode->next = prevNode->next;
	    prevNode->next = newNode;
	}
	
	int deleteAtBeg(struct node* *start){
	  if(*start == NULL){
	    printf("Linkedlist is empty");
	    return -99;
	  }
	  struct node *temp = *start;
	  int val = temp->data;   //start->info   
	  *start = (*start)->next;
	  free(temp);
	  return val;  
	}
	
	int removeLastNode(struct node** start) {
	 if (*start == NULL) {
	     printf("Linked list is empty\n");
	     return -99;
	 }
	 
	 struct node* temp = *start;
	
	 // If there's only one node
	 if (temp->next == NULL) {
	     int val = temp->data;
	     *start = NULL;  // Set the start to NULL, indicating the list is empty
	     free(temp);
	     return val;
	 }
	
	 // Traverse the list to find the second-to-last node
	 while (temp->next->next != NULL) {
	     temp = temp->next;
	 }
	
	 int val = temp->next->data;
	 free(temp->next);
	 temp->next = NULL;
	 return val;
	}
	
	int removeMiddleNode(struct node** start, int position) {
	 if (*start == NULL) {
	     printf("Linked list is empty\n");
	     return -99;
	 }
	
	 struct node* temp = *start;
	
	 // If the node to be deleted is the head (position 1)
	 if (position == 1) {
	     return deleteAtBeg(start);  // Reuse the deleteAtBeg function
	 }
	
	 // Traverse the list to find the node before the one to be deleted
	 int i;
	 for (i = 1; temp != NULL && i < position - 1; i++) {
	     temp = temp->next;
	 }
	
	 // If position is greater than the number of nodes
	 if (temp == NULL || temp->next == NULL) {
	     printf("Position out of range\n");
	     return -99;
	 }
	
	 struct node* toDelete = temp->next;
	 int val = toDelete->data;
	 temp->next = toDelete->next;
	 free(toDelete);
	
	 return val;
	}
	
	void DisplayList(struct node* head) {
	    struct node* temp = head;
	    while (temp != NULL) {
	        printf("|%d|%d|->", temp->data,temp->next);
	        temp = temp->next;
	    }
	    printf("NULL\n");
	}
	
	
	int main() {
	    struct node* head = NULL;
	    int choice, data, key,val;
		int i;
    while (1) {
    printf("-----***-----");
        printf("\nMenu\n");
        printf("1. Insert At Beginning\n");
        printf("2. Insert At End\n");
        printf("3. Insert At any position\n");
        printf("4. Deletion At Beginning\n");
        printf("5. Deletion At End\n");
        printf("6. DEletion At any position\n");
        printf("7. Display List\n");
        printf("8. Exit\n");
    printf("-----***-----");
        printf("\nEnter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter data at beginning: ");
                scanf("%d", &data);
                AtBeginning(&head, data);
                break;
            case 2:
                printf("Enter data at end: ");
                scanf("%d", &data);
                AtEnd(&head, data);
                break;
            case 3:
                printf("Enter data to insert: ");
                scanf("%d", &data);
                printf("Enter position in which the data will be inserted: ");
                scanf("%d", &key);
                struct node* temp = head;
                for (i=1;temp != NULL && i<key-1;i++) {
                    temp = temp->next;
                }
                if (temp == NULL) {
                    printf("Node with value %d not found\n", key);
                } else {
                    AfterNode(temp, data);
                }
                break;
            case 4:
      			val = deleteAtBeg(&head);
      			if(val != -99)
       			printf("The deleted value is: %d\n", val);
      			break;
      		case 5:
      			val = removeLastNode(&head);
      			if(val != -99)
       			printf("The deleted value is: %d\n", val);
      			break;
      		case 6:
 				printf("Enter position to delete: ");
 				scanf("%d", &key);
 				val = removeMiddleNode(&head, key);
 				if (val != -99) {
     			printf("The deleted value is: %d\n", val);
 				}
                break;
            case 7:
                DisplayList(head);
                break;
            case 8:
                printf("Exiting...\n");
                exit(0);
            default:
                printf("Invalid choice\n");
        }
    }

    return 0;
}



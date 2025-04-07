#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *prev;
    struct Node *next;
} Node;

typedef struct Doubly_LL {
    Node *head;
    Node *tail;
} Doubly_LL;

Node* createNode(int val) {
    Node *new_node = (Node *)malloc(sizeof(Node));
    new_node->data = val;
    new_node->prev = NULL;
    new_node->next = NULL;
    return new_node;
}

void display(Doubly_LL *x) {
    Node *temp = x->head;
    while (temp != NULL) {
        printf("%d<->", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}
void insertAtEnd(Doubly_LL *dll, int val) {
    Node *new_node = createNode(val);
    if (dll->tail == NULL) {
        dll->head = new_node;
        dll->tail = new_node;
        return;
    }
    dll->tail->next = new_node;
    new_node->prev = dll->tail;
    dll->tail = new_node;
}

void traverse_list(Doubly_LL *x) {
    display(x);
}

int search_list(Node *start, int num) {
    Node *temp = start;
    while (temp != NULL) {
        if (temp->data == num) {
            return 1;
        }
        temp = temp->next;
    }
    return 0;
}

void sort_list(Doubly_LL *x) {
    Node *i, *j;
    int temp;
    for (i = x->head; i != NULL; i = i->next) {
        for (j = i->next; j != NULL; j = j->next) {
            if (i->data > j->data) {
                temp = i->data;
                i->data = j->data;
                j->data = temp;
            }
        }
    }
}

int menu() {
    int x;
    printf("\nMENU:\n1. Search data in the Linked list\n2. Sort data in linked list\n3. Traverse the Linked List\n4. Exit\n");
    printf("Your Choice: ");
    scanf("%d", &x);
    return x;
}

int main() {
    int choice, result, num;
    
    // Initializing the doubly linked list
    Doubly_LL x = {NULL, NULL};
    
    // Manually adding nodes
    insertAtEnd(&x, 50);
    insertAtEnd(&x, 20);
    insertAtEnd(&x, 30);
    insertAtEnd(&x, 40);
    
    printf("\nLinked List: ");
    display(&x);

    while (1) {
        choice = menu();
        switch (choice) {
            case 1:
                printf("\nEnter the element you want to search: ");
                scanf("%d", &num);
                result = search_list(x.head, num);
                
                if (result == 1) {
                    printf("\n%d is present in the Linked List.\n", num);
                } else {
                    printf("\n%d is not present in the Linked List.\n", num);
                }
                break;
            
            case 2:
                printf("\nSorting Done.");
                sort_list(&x);
                printf("\nSorted List: ");
                display(&x);
                break;
            
            case 3:
                traverse_list(&x);
                break;
                
            case 4:
                exit(0);
                
            default:
                printf("Enter a valid option from MENU and try again.\n");
        }
    }

    return 0;
}

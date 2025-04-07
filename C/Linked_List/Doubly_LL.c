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

void display(Doubly_LL *dll) {
    Node *temp = dll->head;
    while (temp != NULL) {
        printf("%d<->", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

void insertAtBeg(Doubly_LL *dll, int val) {
    Node *new_node = createNode(val);
    if (dll->head == NULL) {
        dll->head = new_node;
        dll->tail = new_node;
        return;
    }
    new_node->next = dll->head;
    dll->head->prev = new_node;
    dll->head = new_node;
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

void insertAtAny(Doubly_LL *dll, int k, int val) {
    Node *temp = dll->head;
    if (k == 1) {
        insertAtBeg(dll, val);
        return;
    }
    int i;
    for (i = 1; i < k - 1; i++) {
        if (temp == NULL) {
            printf("Invalid position!\n");
            return;
        }
        temp = temp->next;
    }
    Node *new_node = createNode(val);
    new_node->next = temp->next;
    new_node->prev = temp;
    if (temp->next != NULL) {
        temp->next->prev = new_node;
    }
    temp->next = new_node;
    if (new_node->next == NULL) {
        dll->tail = new_node;
    }
}

int deleteAtBeg(Doubly_LL *dll) {
    if (dll->head == NULL) {
        return -99;
    }
    Node *temp = dll->head;
    int val = temp->data;
    dll->head = dll->head->next;
    if (dll->head != NULL) {
        dll->head->prev = NULL;
    } else {
        dll->tail = NULL;
    }
    free(temp);
    return val;
}

int deleteAtEnd(Doubly_LL *dll) {
    if (dll->tail == NULL) {
        return -99;
    }
    Node *temp = dll->tail;
    int val = temp->data;
    dll->tail = dll->tail->prev;
    if (dll->tail == NULL) {
        dll->head = NULL;
    } else {
        dll->tail->next = NULL;
    }
    free(temp);
    return val;
}

int deleteAtAny(Doubly_LL *dll, int k) {
    if (dll->head == NULL) {
        return -99;
    }
    if (k == 1) {
        return deleteAtBeg(dll);
    }
    Node *temp = dll->head;
    int i;
    for (i = 1; i < k; i++) {
        if (temp == NULL) {
            return -99;
        }
        temp = temp->next;
    }
    int val = temp->data;
    if (temp->prev != NULL) {
        temp->prev->next = temp->next;
    }
    if (temp->next != NULL) {
        temp->next->prev = temp->prev;
    }
    if (temp == dll->tail) {
        dll->tail = temp->prev;
    }
    free(temp);
    return val;
}

int main() {
    Doubly_LL x = {NULL, NULL};
    int choice, data, key, val;

    while (1) {
        printf("\n-----***-----\n");
        printf("Menu\n");
        printf("1. Insert At Beginning\n");
        printf("2. Insert At End\n");
        printf("3. Insert At Any Position\n");
        printf("4. Delete At Beginning\n");
        printf("5. Delete At End\n");
        printf("6. Delete At Any Position\n");
        printf("7. Display List\n");
        printf("8. Exit\n");
        printf("-----***-----\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter data at beginning: ");
                scanf("%d", &data);
                insertAtBeg(&x, data);
                break;
            case 2:
                printf("Enter data at end: ");
                scanf("%d", &data);
                insertAtEnd(&x, data);
                break;
            case 3:
                printf("Enter data to insert: ");
                scanf("%d", &data);
                printf("Enter position: ");
                scanf("%d", &key);
                insertAtAny(&x, key, data);
                break;
            case 4:
                val = deleteAtBeg(&x);
                if (val != -99) {
                    printf("Deleted value: %d\n", val);
                } else {
                    printf("List is empty!\n");
                }
                break;
            case 5:
                val = deleteAtEnd(&x);
                if (val != -99) {
                    printf("Deleted value: %d\n", val);
                } else {
                    printf("List is empty!\n");
                }
                break;
            case 6:
                printf("Enter position to delete: ");
                scanf("%d", &key);
                val = deleteAtAny(&x, key);
                if (val != -99) {
                    printf("Deleted value: %d\n", val);
                } else {
                    printf("Invalid position!\n");
                }
                break;
            case 7:
                display(&x);
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

#include <stdio.h>
#include <stdlib.h>

// Node structure
typedef struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
} Node;

// Deque structure
typedef struct {
    Node* front;
    Node* rear;
} Deque;

// Initialize the deque
void initializeDeque(Deque* dq) {
    dq->front = NULL;
    dq->rear = NULL;
}

// Check if the deque is empty
int isEmpty(Deque* dq) {
    return (dq->front == NULL);
}

// Insert an element at the front
void insertFront(Deque* dq, int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (!newNode) {
        printf("Memory allocation failed!\n");
        return;
    }
    newNode->data = data;
    newNode->prev = NULL;
    newNode->next = dq->front;

    if (isEmpty(dq)) {
        dq->rear = newNode;
    } else {
        dq->front->prev = newNode;
    }
    dq->front = newNode;
    printf("Inserted %d at the front.\n", data);
}

// Insert an element at the rear
void insertRear(Deque* dq, int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (!newNode) {
        printf("Memory allocation failed!\n");
        return;
    }
    newNode->data = data;
    newNode->next = NULL;
    newNode->prev = dq->rear;

    if (isEmpty(dq)) {
        dq->front = newNode;
    } else {
        dq->rear->next = newNode;
    }
    dq->rear = newNode;
    printf("Inserted %d at the rear.\n", data);
}

// Delete an element from the front
void deleteFront(Deque* dq) {
    if (isEmpty(dq)) {
        printf("Deque is empty!\n");
        return;
    }
    Node* temp = dq->front;
    printf("Deleted %d from the front.\n", temp->data);
    dq->front = dq->front->next;

    if (dq->front == NULL) {
        dq->rear = NULL;
    } else {
        dq->front->prev = NULL;
    }
    free(temp);
}

// Delete an element from the rear
void deleteRear(Deque* dq) {
    if (isEmpty(dq)) {
        printf("Deque is empty!\n");
        return;
    }
    Node* temp = dq->rear;
    printf("Deleted %d from the rear.\n", temp->data);
    dq->rear = dq->rear->prev;

    if (dq->rear == NULL) {
        dq->front = NULL;
    } else {
        dq->rear->next = NULL;
    }
    free(temp);
}

// Display the deque
void display(Deque* dq) {
    if (isEmpty(dq)) {
        printf("Deque is empty!\n");
        return;
    }
    Node* temp = dq->front;
    printf("Deque elements are: ");
    while (temp) {
        printf("%d ", temp->data);
        temp = temp->next;
    }
    printf("\n");
}

// Menu function
int Menu() {
    int choice;
    printf("\n\nMENU\n1. Enqueue Element at Front\n2. Enqueue Element at Rear\n3.Dequeue Element at Front\n4. Dequeue Element at Rear\n5. Display\n6. Exit\n");
    printf("Enter your choice: ");
    scanf("%d", &choice);
    return choice;
}

// Main function
int main() {
    Deque dq;
    initializeDeque(&dq);
    int choice, data;

    while (1) {
        choice = Menu();
        switch (choice) {
            case 1:
                printf("Enter data to be inserted at front: ");
                scanf("%d", &data);
                insertFront(&dq, data);
                break;

            case 2:
                printf("Enter data to be inserted at rear: ");
                scanf("%d", &data);
                insertRear(&dq, data);
                break;

            case 3:
                deleteFront(&dq);
                break;

            case 4:
                deleteRear(&dq);
                break;

            case 5:
                display(&dq);
                break;

            case 6:
                printf("Exiting...\n");
                exit(0);

            default:
                printf("Invalid choice! Try again.\n");
        }
    }

    return 0;
}


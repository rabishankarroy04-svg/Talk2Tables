#include<stdio.h>
#include<stdlib.h>

typedef struct Node {
    int coeff;
    int exp;
    struct Node *link;
} stdNode;

stdNode *create_node(int val1, int val2) {
    stdNode *new_node = (stdNode *)malloc(sizeof(stdNode));
    if (new_node == NULL) {
        printf("Memory is not allocated.");
        exit(1);
    }
    new_node->coeff = val1;
    new_node->exp = val2;
    new_node->link = NULL;
    return new_node;
}

void insert_Nodedata(stdNode **start, int val1, int val2) {
    stdNode *new_node = create_node(val1, val2);
    if (*start == NULL) {
        *start = new_node;
        return;
    }
    stdNode *temp = *start;
    while (temp->link != NULL) {
        temp = temp->link;
    }
    temp->link = new_node;
}

void DisplayList(stdNode *head) {
    stdNode *temp = head;
    int is_first = 1; 

    while (temp != NULL) {
        if (temp->coeff != 0) {
            // Print the sign: no sign for the first term, otherwise + or -
            if (temp->coeff > 0 && !is_first) {
                printf("+");
            } else if (temp->coeff < 0 && !is_first) {
                printf("-");
            }

            // Print the coefficient if it's not 1 or -1, or if the exponent is 0
            if (abs(temp->coeff) != 1 || temp->exp == 0) {
                printf("%d", abs(temp->coeff));
            }

            // Print the variable part if the exponent is non-zero
            if (temp->exp != 0) {
                if (temp->exp == 1) {
                    printf("x");
                } else {
                    printf("x^%d", temp->exp);
                }
            }

            is_first = 0;  // From now on, it's not the first term
        }
        temp = temp->link;
    }

    // If all coefficients were zero, print 0
    if (is_first) {
        printf("0");
    }
}

void poly_addition(stdNode *start1, stdNode *start2) {
    stdNode *head = NULL;

    while (start1 != NULL && start2 != NULL) {
        if (start1->exp == start2->exp) {
            int sum = start1->coeff + start2->coeff;
            if (sum != 0) {
                insert_Nodedata(&head, sum, start1->exp);
            }
            start1 = start1->link;
            start2 = start2->link;
        } else if (start1->exp > start2->exp) {
            insert_Nodedata(&head, start1->coeff, start1->exp);
            start1 = start1->link;
        } else {
            insert_Nodedata(&head, start2->coeff, start2->exp);
            start2 = start2->link;
        }
    }

    while (start1 != NULL) {
        insert_Nodedata(&head, start1->coeff, start1->exp);
        start1 = start1->link;
    }

    while (start2 != NULL) {
        insert_Nodedata(&head, start2->coeff, start2->exp);
        start2 = start2->link;
    }

    printf("\nResult of Addition:\n");
    DisplayList(head);
    printf("\n");
}

void poly_subtraction(stdNode *start1, stdNode *start2) {
    stdNode *head = NULL;

    while (start1 != NULL && start2 != NULL) {
        if (start1->exp == start2->exp) {
            int diff = start1->coeff - start2->coeff;
            if (diff != 0) {
                insert_Nodedata(&head, diff, start1->exp);
            }
            start1 = start1->link;
            start2 = start2->link;
        } else if (start1->exp > start2->exp) {
            insert_Nodedata(&head, start1->coeff, start1->exp);
            start1 = start1->link;
        } else {
            insert_Nodedata(&head, -start2->coeff, start2->exp);
            start2 = start2->link;
        }
    }

    while (start1 != NULL) {
        insert_Nodedata(&head, start1->coeff, start1->exp);
        start1 = start1->link;
    }

    while (start2 != NULL) {
        insert_Nodedata(&head, -start2->coeff, start2->exp);
        start2 = start2->link;
    }

    printf("\nResult of Subtraction:\n");
    DisplayList(head);
    printf("\n");
}

int main() {
    stdNode *start1 = NULL;
    stdNode *start2 = NULL;

    int choice, val1, val2, num, j;

    printf("How many terms are there in polynomial 1?\n");
    scanf("%d", &num);
    for (j = 1; j <= num; j++) {
        printf("\nEnter coefficient of term %d:", j);
        scanf("%d", &val1);
        printf("\nEnter exponent of term %d:", j);
        scanf("%d", &val2);
        insert_Nodedata(&start1, val1, val2);
    }

    printf("\nHow many terms are there in polynomial 2?\n");
    scanf("%d", &num);
    for (j = 1; j <= num; j++) {
        printf("\nEnter coefficient of term %d:", j);
        scanf("%d", &val1);
        printf("\nEnter exponent of term %d:", j);
        scanf("%d", &val2);
        insert_Nodedata(&start2, val1, val2);
    }

    while (1) {
        printf("\nMENU\n1. Polynomial Addition\n2. Polynomial Subtraction\n3. Exit\nYour Choice:");
        scanf("%d", &choice);

        printf("\nPolynomial 1:\n");
        DisplayList(start1);
        printf("\nPolynomial 2:\n");
        DisplayList(start2);

        switch (choice) {
            case 1:
                printf("\nPerforming Polynomial Addition...\n");
                poly_addition(start1, start2);
                break;

            case 2:
                printf("\nPerforming Polynomial Subtraction...\n");
                poly_subtraction(start1, start2);
                break;

            case 3:
                printf("\nExiting...\n");
                exit(0);

            default:
                printf("\nEnter a valid choice.");
        }
    }

    return 0;
}

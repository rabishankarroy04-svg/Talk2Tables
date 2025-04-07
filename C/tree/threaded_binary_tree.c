#include<stdio.h>
#include<stdlib.h>

struct Node
{
    struct Node *left, *right;
    int info;
    int lthread;
    int rthread;
};

struct Node *insert(struct Node *root, int ikey)
{
    struct Node *ptr = root;
    struct Node *par = NULL; 

    while (ptr != NULL)
    {
        if (ikey == (ptr->info))
        {
            printf("Duplicate Key !\n");
            return root;
        }

        par = ptr; 

        if (ikey < ptr->info)
        {
            if (ptr->lthread == 0)
                ptr = ptr->left;
            else
                break;
        }
        else
        {
            if (ptr->rthread == 0)
                ptr = ptr->right;
            else
                break;
        }
    }

    struct Node *tmp = (struct Node *)malloc(sizeof(struct Node));
    if (tmp == NULL) {
        printf("Memory allocation failed!\n");
        return root;
    }
    tmp->info = ikey;
    tmp->lthread = 1;
    tmp->rthread = 1;

    if (par == NULL)
    {
        root = tmp;
        tmp->left = NULL;
        tmp->right = NULL;
    }
    else if (ikey < (par->info))
    {
        tmp->left = par->left;
        tmp->right = par;
        par->lthread = 0;
        par->left = tmp;
    }
    else
    {
        tmp->left = par;
        tmp->right = par->right;
        par->rthread = 0;
        par->right = tmp;
    }

    return root;
}

struct Node *inorderSuccessor(struct Node *ptr)
{
    if (ptr->rthread == 1)
        return ptr->right;

    ptr = ptr->right;
    while (ptr->lthread == 0)
        ptr = ptr->left;
    
    return ptr;
}

void inorder(struct Node *root)
{
    if (root == NULL) {
        printf("Tree is empty\n");
        return;
    }

    struct Node *ptr = root;
    while (ptr->lthread == 0)
        ptr = ptr->left;

    while (ptr != NULL)
    {
        printf("%d ", ptr->info);
        ptr = inorderSuccessor(ptr);
    }
}

int main() {
    struct Node *root = NULL;
    int d;

    while (1) {
        printf("Please choose an option:\n");
        printf("1. Insert\n");
        printf("2. In-order Traversal\n");
        printf("3. Exit\n");

        printf("Your choice: ");
        int ch;
        scanf("%d", &ch);

        switch (ch) {
            case 1:
                printf("Enter the data to insert: ");
                scanf("%d", &d);
                root = insert(root, d);
                break;
            case 2:
                printf("In-order traversal of the threaded binary tree: ");
                inorder(root);
                printf("\n");
                break;
            case 3:
                return 0;
            default:
                printf("Invalid input! Please try again.\n");
        }
    }

    return 0;
}

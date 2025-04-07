#include <stdio.h>
#include <stdlib.h>

struct node {
    int data;
    struct node *right;
    struct node *left;
    int height;
};

struct node* rightRotate(struct node *y);
struct node* leftRotate(struct node *x);

int height(struct node *N) {
    if (N == NULL)
        return 0;
    return N->height;
}


int max(int a, int b) {
    return (a > b) ? a : b;
}

struct node* create(int d) {
    struct node* newnode = NULL;
    newnode = (struct node*)malloc(sizeof(struct node));
    if (newnode == NULL) {
        printf("Memory allocation failed!!!\n");
        return NULL;
    }
    newnode->data = d;
    newnode->left = NULL;
    newnode->right = NULL;
    newnode->height = 1;  // New node is initially at height 1...lets try it i dont know will work or not...
    return newnode;
}

int getBalance(struct node *N) {
    if (N == NULL)
        return 0;
    return height(N->left) - height(N->right);
}

// Right rotate the subtree rooted with y
struct node* rightRotate(struct node *y) {
    struct node *ch_lef = y->left;
    struct node *ch_lef_rig = ch_lef->right;

    ch_lef->right = y;
    y->left = ch_lef_rig;

    // hight ta thik kore6i......
    y->height = max(height(y->left), height(y->right)) + 1;
    ch_lef->height = max(height(ch_lef->left), height(ch_lef->right)) + 1;

   
    return ch_lef;
}

// Left rotate the subtree rooted with x
struct node* leftRotate(struct node *x) {
    struct node *ch_rig = x->right;
    struct node *ch_rig_lef = ch_rig->left;


    ch_rig->left = x;
    x->right = ch_rig_lef;

   
    x->height = max(height(x->left), height(ch_rig->right)) + 1;
    ch_rig->height = max(height(ch_rig->left), height(ch_rig->right)) + 1;


    return ch_rig;
}

struct node* insert(struct node* node, int key) {
    if (node == NULL)
        return(create(key));

    if (key < node->data)
        node->left = insert(node->left, key);
    else if (key > node->data)
        node->right = insert(node->right, key);
    else 
        return node;

    // Updateing height of father node
    node->height = 1 + max(height(node->left), height(node->right));

    // now i am cheaking is this  unbalenced after all of this jhamela...
    int balance = getBalance(node);

    // If this node becomes unbalanced, there are 4 cases

    // right rotate Case (>)
    if (balance > 1 && key < node->left->data)
        return rightRotate(node);

    // left Case(<)
    if (balance < -1 && key > node->right->data)
        return leftRotate(node);

    // Left Right Case
    if (balance > 1 && key > node->left->data) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && key < node->right->data) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    
    return node;
}

void inorder(struct node* root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->data);  
        inorder(root->right);
    }
}

void preorder(struct node* root) {
    if (root != NULL) {
        printf("%d ", root->data);  
        preorder(root->left);
        preorder(root->right);
    }
}


void postorder(struct node* root) {
    if (root != NULL) {
        postorder(root->left);
        postorder(root->right);
        printf("%d ", root->data);  
    }
}


struct node* find(struct node* root) {
    while (root->left != NULL) {
        root = root->left;
    }
    return root;
}


struct node* del(struct node* root, int t) {
    if (root == NULL)
        return root;

    
    if (t > root->data) {
        root->right = del(root->right, t);
    } else if (t < root->data) {
        root->left = del(root->left, t);
    } else {  
       
        if (root->left == NULL) {
            struct node* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            struct node* temp = root->left;
            free(root);
            return temp;
        }

       
        struct node* temp = find(root->right);

       
        root->data = temp->data;

       
        root->right = del(root->right, temp->data);
    }

    // Update height of father node
    root->height = 1 + max(height(root->left), height(root->right));

    // unbalanced node ki dekh6i
    int balance = getBalance(root);

    // If this node becomes unbalanced, there are 4 cases same as before

    // right Case
    if (balance > 1 && getBalance(root->left) >= 0)
        return rightRotate(root);

    // Left Right Case
    if (balance > 1 && getBalance(root->left) < 0) {
        root->left = leftRotate(root->left);
        return rightRotate(root);
    }

    // left Case
    if (balance < -1 && getBalance(root->right) <= 0)
        return leftRotate(root);

    // Right Left Case
    if (balance < -1 && getBalance(root->right) > 0) {
        root->right = rightRotate(root->right);
        return leftRotate(root);
    }

    return root;
}

int main() {
    struct node *root = NULL;
    int d, t;

    printf("Welcome to AVL Tree operations:\n");

    while (1) {
        printf("Please choose an option:\n");
        printf("1. Insert\n");
        printf("2. Inorder Traversal\n");
        printf("3. Preorder Traversal\n");
        printf("4. Postorder Traversal\n");
        printf("5. Delete\n");
        printf("6. Exit\n");

        printf("Your choice: ");
        int ch;
        scanf("%d", &ch);

        switch (ch) {
            case 1:
                printf("Enter the data: ");
                scanf("%d", &d);
                root = insert(root, d);
                break;
            case 2:
                printf("Inorder Traversal: ");
                inorder(root);
                printf("\n");
                break;
            case 3:
                printf("Preorder Traversal: ");
                preorder(root);
                printf("\n");
                break;
            case 4:
                printf("Postorder Traversal: ");
                postorder(root);
                printf("\n");
                break;
            case 5:
                printf("Enter the TARGET to delete: ");
                scanf("%d", &t);
                root = del(root, t);
                break;
            case 6:
                return 0;
            default:
                printf("Invalid choice!\n");
        }
    }

    return 0;
}

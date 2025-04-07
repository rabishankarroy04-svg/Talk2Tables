#include<iostream>
using namespace std;

class Node{
    public:

    int value;
    Node *right;
    Node *left;

    Node(int num){
        value= num;
        right = left = NULL;
    }
};

void preTraversal(Node *root){
    if(root==NULL)
        return;
    
    cout<<root->value<<" ";
    preTraversal(root->left);
    preTraversal(root->right);
}

void inTraversal(Node *root){
    if(root==NULL)
        return;
    inTraversal(root->left);
    cout<<root->value<<" ";
    inTraversal(root->right);
}

void postTraversal(Node *root){
    if(root==NULL)
        return;

    postTraversal(root->left);
    postTraversal(root->right);
    cout<<root->value<<" ";
}

int main(){
    Node *rootNode = new Node(2);
    rootNode->left = new Node(4);
    rootNode->right = new Node(10);
    rootNode->left->left = new Node(6);
    rootNode->left->right = new Node(5);
    rootNode->right->right = new Node(11);

    cout<<"Pre Order Traversal: ";
    preTraversal(rootNode);
    cout<<endl;

    cout<<"In Order Traversal: ";
    inTraversal(rootNode);
    cout<<endl;

    cout<<"Post Order Traversal: ";
    postTraversal(rootNode);
    cout<<endl;

return 0;
}
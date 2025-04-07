#include<iostream>
using namespace std;

class Node{
    public:

    int value;
    Node *left;
    Node *right;

    Node(int val){
        value = val;
        left = right = NULL;
    }
};

int main(){
    Node *root = new Node(8);
    root->left = new Node(10);
    root->right = new Node(7);

    cout<<"Root:"<<root->value<<endl;
    cout<<"Left Child:"<<root->left->value<<endl;
    cout<<"Right Child:"<<root->right->value<<endl;

    return 0;
}
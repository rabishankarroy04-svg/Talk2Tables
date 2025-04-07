#include<iostream>
using namespace std;

class Node{

    public:
    int data;
    Node *prev;
    Node *next;

    Node(int val){
        data=val;
        prev=NULL;
        next=NULL;
    }
};

class Doubly_LL{

    public:
    Node *head;
    Node *tail;

    Doubly_LL(){
        head = NULL;
        tail = NULL;
    }  

    void insertAtEnd(int val){
        Node *new_node = new Node(val);
        if(tail==NULL){
            head = new_node;
            tail = new_node;
            return ;
        }
        tail->next = new_node;
        new_node->prev = tail;
        tail = new_node;
        return ;
    }

    void display(){
        Node *temp = head;
        while(temp != NULL){
            cout<<temp->data<<"<->";
            temp=temp->next;
        }
        cout<<endl;
    }
    
    void reverse_DLL(Node* &head , Node* &tail){
        Node *curr = head;
        while(curr){
            Node *nextPtr = curr->next;
            curr->next = curr->prev;
            curr->prev = nextPtr;
            curr = nextPtr;
        }
        Node *newHead = tail ;
        tail = head;
        head = newHead;
    }
    bool ispalindrome_DLL(Node* &head , Node* &tail){
        while(head != tail && tail != head->prev){
            if(head->data != tail->data){
                return false;
            }
            head = head->next;
            tail = tail->prev;
        }
        return true;
    }
};

int main(){
    Doubly_LL x;

    x.insertAtEnd(35);
    x.insertAtEnd(37);
    x.insertAtEnd(38);
    x.insertAtEnd(37);
    x.insertAtEnd(35);
    x.display();

    int temp = x.ispalindrome_DLL(x.head,x.tail);
    if(temp == 1){
        cout<<"Linked List is palindrome."<<endl;
    }
    else{
        cout<<"Linked List is not palindrome."<<endl;
    }
    
return 0;
}
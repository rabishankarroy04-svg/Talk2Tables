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

    void display(){
        Node *temp = head;
        while(temp != NULL){
            cout<<temp->data<<"<->";
            temp=temp->next;
        }
        cout<<endl;
    }

    void insertAtBeg(int val){
        Node *new_node = new Node(val);
        if(head==NULL){
            head = new_node;
            tail = new_node;
            return ;
        }
        new_node->next = head;
        head->prev = new_node;
        head=new_node;
        return;
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

    void insertAtAny(int k ,int val){
        //assuming k is less than or equal to length of DLL
        Node *temp =head;
        for(int i=1 ; i < k ; i++){
            temp=temp->next;
        }
        //temp will be pointing to the node at k position
        Node *new_node = new Node(val);
        new_node->next = temp->next;
        temp->next = new_node;

        new_node->prev = temp;
        new_node->next->prev = new_node;
        return;
    }

    void deletionAtBeg(){
        if(head == NULL){
            return;
        }
        Node *temp = head;
        head = head->next;
        if(head != NULL){
            head->prev = NULL;
            free(temp);
        }

        if (head == NULL){
            tail = NULL;
        }
        else{
            head->prev = NULL;
        }
        free(temp);
    }

    void deleteAtEnd(){
        if(head == NULL){
            return;
        }
        Node *temp = tail;
        tail = tail->prev;
        if (tail == NULL){
            head = NULL;
        }
        else{
            tail->next = NULL;
        }
        free(temp);
    }

    void deleteAtAny(int k){
        //assuming k is less than or equal to length of DLL
        Node *temp =head;
        for(int i=1 ; i < k ; i++){
            temp=temp->next;
        }
        //temp will be pointing to the node at k position
        temp->prev->next = temp->next;
        temp->next->prev = temp->prev;

        free(temp);
    }

};

int main(){
    Node *new_node = new Node(3);
    Doubly_LL x;
    x.head = new_node;
    x.tail = new_node;
    cout<<x.head->data<<endl;

    x.insertAtBeg(35);
    x.insertAtBeg(37);
    x.insertAtBeg(38);
    x.insertAtBeg(39);
    x.insertAtBeg(40);
    x.display();

    x.insertAtEnd(9);
    x.insertAtEnd(19);
    x.insertAtEnd(29);
    x.display();

    x.insertAtAny(3,50);
    x.display();

    x.deletionAtBeg();
    x.display();

    x.deleteAtEnd();
    x.display();

    x.deleteAtAny(5);
    x.display();

    return 0;
}
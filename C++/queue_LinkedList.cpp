#include<iostream>
using namespace std;

class Node{
    public:
        int data;
        Node *next;
    
    Node(int data){
        this->data = data;
        this->next = NULL;
    }
};

class Queue{
    Node *head;
    Node *tail;
    int size;
    public:
        Queue(){
            this->head = NULL;
            this->tail = NULL;
            this->size = 0;
        }

        void enqueue(int data){
            Node *newNode = new Node(data);
            if(this->head == NULL){
                this->head = this->tail = newNode;
            }
            else{
                this->tail->next = newNode;
                this->tail = newNode;
            }
            this->size++ ;
        }

        void dequeue(){
            if(this->head == NULL)
                return;
            else{
                Node *oldHead = this->head;
                Node *newHead = this->head->next;
                this->head = newHead;

                if(this->head == NULL)
                    this->tail == NULL;
        
                oldHead->next = NULL;
                delete oldHead;
            }
            this->size-- ;
        }

        int getSize(){
            return this->size;
        }

        int isEmpty(){
            return this->head == NULL;
        }

        int get_front(){
            if(this->head == NULL)
                return -1;
        return this->head->data;
        }
};

int main(){
    Queue Q;
    Q.enqueue(10);
    Q.enqueue(11);   
    Q.enqueue(12);
    Q.enqueue(14);
    Q.dequeue();
    Q.enqueue(15);

    while( not Q.isEmpty()){
        cout<<Q.get_front()<<" ";
        Q.dequeue();
    }
    return 0;
}
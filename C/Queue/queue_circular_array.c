#include<stdio.h>
#include<stdlib.h>
#define MAX_SIZE 5

int Queue[MAX_SIZE],front=-1,rear=-1,count=0;

int isFull(){
return (rear+1)%MAX_SIZE ==front;
}

int isEmpty(){
return front==-1;
}

void enqueue(int data){
if(isFull()){
printf("Queue Overflow\n");
return;
}
if(front == -1){
front=0;
}
rear = (rear+1)%MAX_SIZE;
Queue[rear]=data;
count++;
}

int dequeue(){
if(isEmpty()){
printf("Queue Underflow\n");
return -99;
}
int num = Queue[front];

if (front==rear){
front=rear=-1;
}
else{
front = (front+1)%MAX_SIZE ;
}
count--;
return num;
}

int get_front(){
return Queue[front];
}

int get_rear(){
return Queue[rear];
}

void display(){
int i;
int temp=front;
printf("\nQueue Datas:\n");
for(i=1;i<=count;i++){
printf("%d ",Queue[temp]);
temp= (temp+1)%MAX_SIZE;
}
}

int Menu(){
int x;
printf("\n\nMENU\n1.Enqueue Element\n2.Dequeue Element\n3.Front Element\n4.Rear Element\n5.Display Queue\n6.Exit");

printf("\nEnter your Choice:");
scanf("%d",&x);

return x;
}

int main(){
int num,choice,val;
printf("Circular Queue_using Array");
while(1){
choice = Menu();

switch(choice){
case 1:
printf("Enter element to be inserted in QUEUE:");
scanf("%d",&num);
enqueue(num);
break;

case 2:
val=dequeue();
if(val != -99){
printf("\nDeleted Element:%d",val);
}
break;

case 3:
val = get_front();
printf("\nFront Element:%d",val);
break;

case 4:
val = get_rear();
printf("\nRear Element:%d",val);
break;

case 5:
display();
break;

case 6:
printf("\nExiting..\n");
exit(0);
break;

default:
printf("\nEnter a valid input and try again...");
}
}
return 0;

}


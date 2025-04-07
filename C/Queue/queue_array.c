#include<stdio.h>
#include<stdlib.h>
#define MAX_SIZE 4

int Queue[MAX_SIZE],front=-1,rear=-1;

void enqueue(){
int val;

if(rear == MAX_SIZE-1){
printf("\nOverflow");
return;
}
else{
printf("Enter the value to be inserted:");
scanf("%d",&val);

if(front==-1 && rear==-1){
front=0;
rear=0;
}
else{
rear=rear+1;
}
}
Queue[rear]=val;
}

int dequeue(){
int val;
if(front==-1 || front>rear){
printf("\nUnderflow");
return -99;
}
else{
val=Queue[front];
front=front+1;
}
return val;
}

int get_front(){
return Queue[front];
}

void display(){
int i;
printf("\nQueue Datas:\n");
for(i=front;i<=rear;i++){
printf("%d ",Queue[i]);
}
}

int Menu(){
int x;
printf("\n\nMENU\n1.Enqueue Element\n2.Dequeue Element\n3.Peek Element\n4.Display Queue\n5.Exit");

printf("\nEnter your Choice:");
scanf("%d",&x);

return x;
}

int main(){
int choice,val;
printf("Linear Queue_using Array");
while(1){
choice = Menu();

switch(choice){
case 1:
enqueue();
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
display();
break;

case 5:
printf("\nExiting..\n");
exit(0);
break;

default:
printf("\nEnter a valid input and try again...");
}
}
return 0;

}

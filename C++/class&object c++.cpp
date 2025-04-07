#include<iostream>
using namespace std;
class student
{
           int roll;
           float marks;
      public:
           void received(int a , float b);
           void display(void)
           {
                  cout<<"Roll ="<<roll<<"\n";              
                  cout<<"Marks="<<marks<<"\n";
           }
        
};
void student :: received(int a , float b)
{
     roll=a;
     marks=b;
}

int main()
{
       int x=1;
       float y=77.75;
       
       student rec1;    // create object rec1 of class student
       cout<<"\nObject rec1\n";
       rec1.received(x,y);
       rec1.display();

      student rec2;   
       cout<<"\nObject rec2\n";
       rec2.received(5,88.90);
       rec2.display();
 
return 0;
}


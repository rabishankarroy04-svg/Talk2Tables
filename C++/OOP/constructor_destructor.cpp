#include<iostream>
using namespace std;

class rectangle{  
public:
     int l;
     int b;

     rectangle(){ //default constructor:No Arguments passed
        l=0; 
        b=0;
     }

     rectangle(int x,int y){ //parameterised constructor:Arguments passed
        l=x;
        b=y;
     }

     rectangle(rectangle& r){ //copy constructor:initialise an object with another existing object of same class
        l=r.l;
        b=r.b;
     }

     ~rectangle(){ //decstructor
        cout<<"Destructor is called."<<endl;
     }
};

int main(){
    rectangle* r0 = new rectangle;
    cout<<r0->l<<" "<<r0->b<<endl;
    delete r0; //we can only use "delete" keyword in case of pointer

    rectangle r1;
    cout<<r1.l<<" "<<r1.b<<endl;

    rectangle r2(3,4);
    cout<<r2.l<<" "<<r2.b<<endl;

    rectangle r3=r2;
    cout<<r3.l<<" "<<r3.b<<endl;

    return 0;
}
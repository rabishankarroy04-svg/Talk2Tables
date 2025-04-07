#include<iostream>
using namespace std;

class Parent{  
   public:
//when we want to decide the function in runtime we use virtual function
    virtual void print(){  
        cout<<"Parent class"<<endl;
    }
    void show(){
        cout<<"Parent class"<<endl;
    }
};

class Child:public Parent{
    public:
    void print(){
        cout<<"child class"<<endl;
    }
    void show(){
        cout<<"child class"<<endl;
    }
};

int main(){
    Parent *p;
    Child c;
    
    p=&c;
    p->print();
    p->show();

    return 0;
}
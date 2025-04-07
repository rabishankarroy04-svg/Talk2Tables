#include<iostream>
using namespace std;

class parent{
    public:

    parent(){
        cout<<"Parent class"<<endl;
    }  
};

class child1: public parent{
    public:

    child1(){
        cout<<"Child:1 class"<<endl;
    }  
};

class child2: public parent{
    public:

    child2(){
        cout<<"Child:2 class"<<endl;
    }  
};

class grand_child: public child1,public child2{
    public:

    grand_child(){
        cout<<"GrandChild class"<<endl;
    }  
};

int main(){
    grand_child c;
    return 0;
}
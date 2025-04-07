#include<iostream>
using namespace std;

class parent1{
    public:

    parent1(){
        cout<<"Parent:1 class"<<endl;
    }  
};

class parent2{
    public:

    parent2(){
        cout<<"Parent:2 class"<<endl;
    }  
};

class child: public parent1,public parent2{
    public:

    child(){
        cout<<"Child class"<<endl;
    }  
};

class child1: public parent1{
    public:

    child1(){
        cout<<"Child:1 class"<<endl;
    }  
};

class child2: public parent1{
    public:

    child2(){
        cout<<"Child:2 class"<<endl;
    }  
};
//child1 and child2 class is inheriting from same parent class it is Hierarchical inheritance

class grand_child: public child{
    public:

    grand_child(){
        cout<<"GrandChild class"<<endl;
    }  
};

int main(){
    child c;
    cout<<endl;
    grand_child d;
    return 0;
}
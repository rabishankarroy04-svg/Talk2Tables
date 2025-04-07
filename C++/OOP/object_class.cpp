#include<iostream>
using namespace std;

class class_name{  //by default access specifier is private
   int data1;
   int data2;
};

class fruit{
public:
    string name;
    string color;
};

class Student{
    string name;
    int roll_no;
};

int main(){
    fruit apple; //apple
    apple.name="Apple";
    apple.color="Red";
    cout<<apple.name<<"-"<<apple.color<<endl;
    
    fruit *mango = new fruit();
    mango->name = "Mango";
    mango->color = "Yellow";
    cout<<mango->name<<"-"<<mango->color<<endl;

    return 0;
}
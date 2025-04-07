#include<iostream>
using namespace std ;
int main()
{
    int a;
    cout<<"Enter your marks:";
    cin>>a;
    if(100>=a && a>=90)
    {
        cout<<"your grade is A+ .";
    }
    else if(90>a && a>=80)
    {
        cout<<"your grade is A .";
    }
    else if(80>=a && a>70)
    {
        cout<<"your grade is B+ .";
    }
    else if(70>=a && a>60)
    {
        cout<<"your grade is B .";
    }
    else if(60>=a && a>50)
    {
        cout<<"your grade is C.";
    }
    else if(50>=a && a>40)
    {
        cout<<"your grade is D.";
    }
    else if(40>=a && a>30)
    {
        cout<<"your grade is E.";
    }
    else if(30>=a && a>=0)
    {
        cout<<"your grade is F.";
    }
    else 
    {
        cout<<"invalid input.";
    }

 return 0;
}
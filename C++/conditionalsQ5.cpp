#include<iostream>
using namespace std ;
int main()
{
 char x;
 float y,z;
 cout<<"Enter an operator(+,-,*,/):";
 cin>>x;
 cout<<"Enter two numbers:";
 cin>>y>>z;
 switch(x)
 {
    case '+':
    cout<<y<<x<<z<<"="<<(y+z);
    break;
    case '-':
    cout<<y<<x<<z<<"="<<(y-z);
    break;
    case '*':
    cout<<y<<x<<z<<"="<<(y*z);
    break;
    case '/':
    cout<<y<<x<<z<<"="<<(y/z);
    break;

 }

 return 0;

}
#include<iostream>
using namespace std;
int main()
{
    int a,b,c;
    cout<<"swapping two numbers:- \n";
    cout<<"a=";
    cin>>a;
    cout<<"b=";
    cin>>b;
    c=a;
    a=b;
    b=c;
    cout<<"after swapping--- \n";
    cout<<"a="<<a<<endl;
    cout<<"b="<<b<<endl;

    return 0;
}
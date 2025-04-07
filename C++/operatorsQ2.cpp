#include<iostream>
using namespace std;
int main()
{
    int a,b;
    cout<<"enter two numbers:";
    cin>>a>>b;
    cout<<((a<50)&&(a<b))?1:0;
    return 0;
}
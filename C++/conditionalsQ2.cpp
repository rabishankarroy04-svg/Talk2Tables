#include<iostream>
using namespace std;
int main()
{
    int x;
    cout<<"Enter a number:" ;
    cin>>x;
    while(x<0)
    {
        x=x*(-1);
    }
    cout<<"the absolute value is:"<<x<<endl;
return 0;
}
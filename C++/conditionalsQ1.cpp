#include<iostream>
using namespace std;
int main()
{
    int l,b;
    cout<<"Length:";
    cin>>l;
    cout<<"Breadth:";
    cin>>b;
    if(l==b)
    {
        cout<<"it is a square.";
    }
    else
    {
        cout<<"it is a rectangle.";
    }
    return 0;
}
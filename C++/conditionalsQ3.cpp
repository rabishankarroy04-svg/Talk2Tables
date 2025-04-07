#include<iostream>
using namespace std ;
int main()
{
    int c,s,profit,loss;
    cout<<"Cost Price:";
    cin>>c;
    cout<<"Selling Price:";
    cin>>s;
    if(c<s)
    {
        cout<<"Profit:"<<(s-c)<<endl;
    }
    else if(c>s)
    {
        cout<<"Loss:"<<(c-s)<<endl;
    }
    else 
    {
        cout<<"Neither profit nor loss.";
    }
    return 0;
}
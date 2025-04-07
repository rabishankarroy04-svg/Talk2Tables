//sum of n natural numbers

#include<iostream>
using namespace std ;
int main()
{
    int x;
    cout<<"enter input:";
    cin>>x;
     int sum=0;
    for(int i=0;i<=x;i++){
        sum=sum+i;

    }
    cout<<"sum of "<<x<<" natural numbers:"<<sum<<endl;
    return 0;
}
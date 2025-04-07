#include<iostream>
using namespace std ;
int main()
{
    int n;
    cout<<"enter number:";  
    cin>>n;
    int digits=0;
    while(n>0){
      digits++;
      n=n/10;

    }
    cout<<"the number of digits:"<<digits;

    return 0;
}
#include<iostream>
using namespace std;
int main()
{
    int b;
    cout<<"Enter a three digit number:";
    cin>>b;
    int first,second,third,sum;
    first=b/100;
    b=b%100;
    second=b/10;
    third=b%10;
    sum=(first+second+third);
    cout<<"sum of the digits:"<<sum<<endl;
    
    return 0;
}
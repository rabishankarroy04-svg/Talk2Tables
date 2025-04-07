#include<iostream>
using namespace std;
int main()
{
    int a,sum;
    cout<<"enter a five digit number:" ;
    cin>>a;
    int first,second,third,fourth,fifth;
    first=a/10000;
    a=a%10000;
    second=a/1000;
    a=a%1000;
    third=a/100;
    a=a%100;
    fourth=a/10;
    fifth=a%10;
    //fifth is the extra variable in case you need the fifth/last digit of the number //
    sum=(first+fourth);
    cout<<"The sum of the first and second last digit :"<<sum<<endl;

    return 0;

}
#include<iostream>
using namespace std ;

int add(int num1,int num2){
    int sum=(num1+num2);
    return sum;
}ā

int add(int num1,int num2,int num3){
    int sum=(num1+num2+num3);
    return sum;
}

int add(float num1,float num2){
    int sum=(num1+num2);
    return sum;
}

int main()
{
    int a=5;
    int b=4;
    int c=4.5;
    cout<<add(a,b)<<endl;
    cout<<add(a,b,10)<<endl;
    cout<<add(c,b)<<endl;

    return 0;
}
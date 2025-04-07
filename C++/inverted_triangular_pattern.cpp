#include<iostream>
using namespace std;
int main()
{
    int a;
    cout<<"enter row no.:";
    cin>>a;
    for(int i=1;i<=a;i++){
        for(int j=1;j<=a-i+1;j++){
        cout<<"*";
    }
    cout<<endl;
    }

    return 0;
}
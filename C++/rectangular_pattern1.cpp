#include<iostream>
using namespace std ;
int main()
{
    int m,n;
    cout<<"enter row:";
    cin>>m;
    cout<<"enter coloumn:";
    cin>>n;
 
    for(int i=1;i<=m;i++){
    for(int j=1;j<=n;j++){
        cout<<"*";
    }
    cout<<endl;
     }
    return  0;
}
#include<iostream>
using namespace std ;
int main()
{
    int a,b;
    cout<<"rows:";
    cin>>a;
    cout<<"coloumns:";
    cin>>b;

    for(int i=1;i<=a;i++){
        for(int j=1;j<=b;j++){
            if((i+j)%2==0){
                cout<<"1";
            }
            else{
                cout<<"2";
            }
        }
        cout<<endl;
    }
    return 0;
}
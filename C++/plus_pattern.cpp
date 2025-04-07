
#include<iostream>
using namespace std ;

int main()
{
    int n;   //n is a odd number.
    cout<<"enter the number(the number must be odd):";
    cin>>n;
    for(int rows=0;rows<n;rows++){
        for(int i=0;i<n;i++){
            if(rows==(n/2) || i==(n/2)){
                cout<<"*";
            }
            else{
                cout<<" ";
            }
        
        } 
    cout<<endl;
    }
       
    return 0;
}
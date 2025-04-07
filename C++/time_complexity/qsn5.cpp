
#include<iostream>
#include<math.h>
using namespace std;

int main()
{
    int n=5;
    for(int i=0;i<n;i++){             //0(n^2)
        for(int j=0;j<sqrt(n);j++){
            cout<<"*";
        }
        cout<<"\n";
    }
return 0;
}

//when i=0 j=sqrt(n) instructions
//when i=1 j=sqrt(n) instructions
//when i=2 j=sqrt(n) instructions
//when i=3 j=sqrt(n) instructions
//..........
//when i=(n-1) j=sqrt(n) instructions
// total=n*sqrt(n)
//worst time complexity= 0(n*sqrt(n))
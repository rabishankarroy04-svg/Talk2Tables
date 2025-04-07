//Time complexity for nested-loop
#include<iostream>
using namespace std;

int main()
{
    int n=5;
    for(int i=0;i<n;i++){        //0(n^2)
        for(int j=0;j<n;j++){
            cout<<"*";
        }
        cout<<"\n";
    }

    for(int i=0;i<n;i++){         //0(n^2)
        for(int j=0;j<i;j++){
            cout<<"*";
        }
        cout<<"\n";
    }
return 0;
}

//when i=0 j=0 instructions
//when i=1 j=1 instructions
//when i=2 j=2 instructions
//when i=3 j=3 instructions
//..........
//when i=(n-1) j=(n-1) instructions
//so total instructions=0+1+2+3+4...+(n-1)
//means n(n-1)/2=n^2/2-n/2     here, n/2 is negligible and n^2/2=n^2
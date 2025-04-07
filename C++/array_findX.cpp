#include<iostream>
using namespace std;

int find_x(int x,int n,int v[]){
    for(int i=0;i<n;i++){
        if(v[i]==x){
            return i;
        }
    }
    return -1;
}

int main()
{
    int n,x;
    cout<<"Enter no. of elements:";
    cin>>n;

    int v[n];
    cout<<"Enter the elements:"<<endl;
    for (int i=0;i<n;i++ ){     //Taking the input
       cin>>v[i];
    }
    cout<<"Enter the number you want to find:";
    cin>>x;

    cout<< "Index of x is: "<<find_x(x,n,v)<<endl;
    return 0;
}
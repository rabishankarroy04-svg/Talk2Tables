//Write a C++ program to check whether a Number can be expressed as a Sum of Two Prime Numbers.

#include<iostream>
#include<vector>
using namespace std;

int prime(int n) {
    int c=0,i;
    for(int i=1;i<=n;i++){
        if(n%i==0){
            c++;
        }
    }
    if(c==2){
        return true;
    }
    else {
            return false;
    }
    
}

int main(){

    int a[100];
    int i,j,k=0,num;
    cout<<"Enter Any Even Number-> ";
    cin>>num;

    for(int i=1;i<=num;i++){
        if(prime(i)){
            a[k]=i;
            k++;
        }
    }
    for(int i=0;i<k;i++){
        for(int j=(i+1);j<k;j++){
            if(a[i]+a[j]==num){
                cout<<num<<"="<<a[i]<<"+"<<a[j]<<endl;
            }
        }
    }


    return 0;
}
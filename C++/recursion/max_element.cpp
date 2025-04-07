#include<iostream>
using namespace std;

int maxElement(int *arr,int idx,int n){
    if(idx==n-1) return arr[idx];

    return max(arr[idx],maxElement(arr,idx+1,n));
}

int main(){
   int n=5;
   int arr[]={3,10,3,2,5};
   cout<<maxElement(arr,0,n)<<endl;
   return 0;
}
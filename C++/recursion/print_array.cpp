#include<iostream>
using namespace std;

void printArray(int *arr,int idx,int n){
    if(idx==n) return;

    cout<<arr[idx]<<endl;

    printArray(arr, idx+1, n);
}

int main(){
    int n=6;
    int array[]={7,4,5,1,2,0};
    printArray(array,0,n);

    return 0;
}
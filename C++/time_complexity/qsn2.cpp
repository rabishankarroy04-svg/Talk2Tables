//traversing an array of length N
#include<iostream>
using namespace std;

int main(){
     int arr[]={1,2,3,4,5,6,7,8,9};
     int n=9;
     for(int i=0;i<n;i++){
        cout<<arr[i]<<endl;
     }
     return 0;
}

//if length of the array is n then we have to done n operations
//then time complexity will be 0(n) .
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

int main(){
   int arr[] = {-2,-1,0,2,4,6,8,10,12};
   int x;

   int n = sizeof(arr)/sizeof(arr[0]);
   vector<int> result(n);
   
   int i=0;
   int j=(n-1);
   int k=(n-1);

   while(i<=j && k>=0){
    x=arr[i]*arr[i];
    result.pushback(abs(x));
    i++;
   }
   cout<<"Array of square : "<<result[i] ;
   
   return 0;
}
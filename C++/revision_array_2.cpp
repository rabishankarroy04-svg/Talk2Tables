#include<iostream>
#include<algorithm>
using namespace std;

int main(){
   int arr[] = {-2,-1,0,2,4,6,8,10,12};
   int x = 14;
   cin>>x;

   int n = sizeof(arr)/sizeof(arr[0]);
   //code to find if there is a pair with sum x.
   int i= 0;
   int j = (n-1);
   bool found = false;
   while(i<j){
    if(arr[i]+arr[j]==x){
       found = true;
       break;
    }
    else if(arr[i]+arr[j]<x){
        i++;
    }
    else{
        j--;
    }
   }
   if(found ==true){
    cout<<"YES!"<<endl;
   }
   else{
    cout<<"NO"<<endl;
   }

   return 0;
}
#include<iostream>
#include<algorithm>
using namespace std;

int main(){
   int arr[] = {-2,-1,0,2,4,6,8,10,12};
   int x;
   cin>>x;

   int n = sizeof(arr)/sizeof(arr[0]);
   //code to find if there is a pair with absolute difference x.
   int i= 0;
   int j = 1;
   bool found = false;
   while(i<n && j<n){
    if(abs(arr[i]-arr[j])==x){
       found = true;
       break;
    }
    else if(abs(arr[i]-arr[j])<x){
        j++;
    }
    else{
        i++;
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
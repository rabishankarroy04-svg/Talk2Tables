#include<iostream>
using namespace std ;

int main()
{  
   int n;
   cout<<"enter the size of array:";
   cin>>n;

   int array[n];
   cout<<"enter array elements:"<<endl;
   for(int i=0;i<n;i++){
    cin>>array[i];
   }
   int count_even=0,count_odd=0;
   
   for(int ele:array){
    if(ele%2==0){
      count_even++;
    }
    else{
        count_odd++;
    }
   }

   cout<<"odd numbers="<<count_odd<<endl;
   cout<<"even numbers="<<count_even<<endl;

   return 0;
}
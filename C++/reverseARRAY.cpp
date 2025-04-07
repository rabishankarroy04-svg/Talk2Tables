#include<iostream>
#include<vector>
using namespace std;

void reverse(int array[],int n){
    int start=0;
    int end=(n-1);
    while(start<end){
        int temp=array[start];
        array[start]=array[end];
        array[end]=temp;
        start++;
        end--;
    }
}
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
   reverse(array , n);

   cout<<"Reversed array:";
   for(int i=0;i<n;i++){
      cout<<array[i]<<" ";
   }

    return 0;
}
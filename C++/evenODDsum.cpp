//difference between the sum of even indices to the sum of odd indices

#include<iostream>
#include<vector>
using namespace std ;
int main()
{
   int array[]={1,2,3,4,5,6,7};

   int a=0;
   for(int i=0;i<7;i++){
    if(i%2==0){
        a=a+array[i];
    }
    else{
        a=a-array[i];
    }
   } 
   cout<<"total sum:"<<a<<endl;

  return 0;
}

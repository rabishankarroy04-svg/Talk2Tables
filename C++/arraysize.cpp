#include<iostream>
using namespace std;

int main()
{
    int array[]={1,2,3,4,5};
    cout<<sizeof(array)<<endl; //to know size of thr array..1element=4byte 
    cout<<sizeof(array)/sizeof(array[0])<<endl; //to know how many elements contains the array
    
    int size=sizeof(array)/sizeof(array[0]);
     //for loop to know the indivisual elements of array
    for(int idx=0;idx<size;idx++){
        cout<<array[idx]<<endl;
    }
    int array2[4];
    cout<<array2[0]<<endl; //this all will show some garbage value at output as the array is not initialised.
    cout<<array2[1]<<endl;
    cout<<array2[2]<<endl;
    cout<<array2[3]<<endl;

    return 0;
}

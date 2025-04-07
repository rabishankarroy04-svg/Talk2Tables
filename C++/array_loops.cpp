#include<iostream>
using namespace std ;
int main()
{   int array[]={1,2,3,4,5};
    int size=sizeof(array)/sizeof(array[0]);

    //for loop
    for(int idx=0;idx<size;idx++){
        cout<<array[idx]<<endl;
    }
    
    //for each loop
    for(int element:array){
        cout<<element<<endl;
    }

    //while loop
    int index=0;
    while(index<size){
        cout<<array[index]<<endl;
        index++;
    }
    char vowels[5];
    cout<<"enter array elements:"<<endl;
        //for(int idx=0;idx<5;idx++){
         //   cin>>vowels[idx];
         //  }

        for(char &element:vowels){
        cin>>element;
        }

        for(int idx=0;idx<5;idx++){
        cout<<vowels[idx]<<" ";
    }

    return 0;
}

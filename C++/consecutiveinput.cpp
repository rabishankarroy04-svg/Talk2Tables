#include<iostream>
using namespace std;
int main()
{
    int currval=0, val=0; //currval is the number we're counting; we'll read new values into val
    cout<<"enter the inputs:"<<endl;
    if(cin>>currval)
    {
        int cnt=1; //store the count of the currval we're processing
        while(cin>>val)
          {//read the remaining numbers
            if(val==currval) //if the values are same add 1 to cnt
               ++cnt;
               else { //otherwise print the count of the previous value
                  cout<<currval<<" occurs "<<cnt<<" times "<<endl;
                  currval=val; //remember the new value
                  cnt=1; //reset the counter

               }

          } //while loop ends here

          cout<<currval<<" occurs "<<cnt<<" times "<<endl; 
          
          //remember to print the count for the last value in the file
    }
    return 0;
}
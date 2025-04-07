#include<iostream>
#include<vector>
using namespace std;
int main()
{
    vector<int>v(8);
    cout<<"Enter the vector elements:"<<endl;
    for(int i=0;i<=8;i++){
        cin>>v[i];
    }
    cout<<"enter the number you want to count:";
    int x;
    cin>>x;
    
     int occurence=0;
     for(int ele:v){
        if(ele==x){
            occurence=occurence+1;
        }
     }
     cout<<occurence<<endl;

    return 0;
}
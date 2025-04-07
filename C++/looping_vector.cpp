#include<iostream>
#include<vector>
using namespace std ;

int main()
{
    vector<int> v;
    //for loop
    for(int i=0;i<5;i++){
     int element;
     cin>>element;
     v.push_back(element);
    
    //cin>>v[i];
    }
    for(int i=0;i<v.size();i++){
        cout<<v[i]<<" "<<endl;
    }
    //for each loop 
    for(int ele:v){
        cout<<ele<<" ";
    }
    cout<<endl;
    //while loop
    int idx=0;
    while(idx<v.size()){
        cout<<v[idx++]<<" ";
    }

    return 0;
}
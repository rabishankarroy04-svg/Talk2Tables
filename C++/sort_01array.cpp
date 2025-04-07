#include<iostream>
#include<vector>
using namespace std;

void K(vector<int> &v){
    int count=0;
    
    for(int ele:v){
        if(ele==0){
            count++;
        }
    }

for (int i = 0; i < v.size(); i++) {
    if(i <count){
        v[i]=0;
    }
    else if(i>=count){
        v[i] = 1;
    }
  }
}

int main()
{
    int n;
    cout<<"enter no. of elements:";
    cin>>n;

    vector<int> v(n);
    cout<<"Enter the elements(only 0 & 1):"<<endl;
    for (int i = 0; i < n;i++ ){     //Taking the input
        cin>>v[i];
    }
    K(v);
    
    cout<<"sorted array:";
    for(int i=0;i<n;i++){
        cout<<v[i]<<" ";
    }

    
    return 0;
}
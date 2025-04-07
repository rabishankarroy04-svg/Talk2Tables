#include<vector>
#include<iostream>
#include<algorithm>
using namespace std;

void sorted(vector<int> &v){
    int left_pointer=0;
    int right_pointer=v.size()-1;
    while(left_pointer<right_pointer){
        if(v[left_pointer]==1 && v[right_pointer]==0){
            v[left_pointer++]=0;
            v[right_pointer--]=1;
        }
        if(v[left_pointer]==0){
            left_pointer++;
        }
        if(v[right_pointer]==1){
            right_pointer--;
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
    for (int i=0;i<n;i++ ){     //Taking the input
       cin>>v[i];
    }

    sorted(v);
    
    cout<<"sorted array:";
    for(int i=0;i<n;i++){
        cout<<v[i]<<" ";
    }
    cout<<endl;

    return 0;
}
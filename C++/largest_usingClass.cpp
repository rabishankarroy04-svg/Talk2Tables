#include<iostream>
using namespace std;

class Solution
{
public:
    int largest(vector<int> &arr, int n)
    {
        int max=arr[0];
        for(int i=1;i<n;i++){
             if(arr[i]>max){
                 max=arr[i];
             }
        }
       return max;
    }
};

int main(){
    int x;
    cin>>x;
    
    int arr[x];
    for(int i=0;i<x;i++){
        cin>>arr[i];
    }
    
    Solution obj;
    int ans= obj.largest(arr,x);
    cout<<ans<<endl;
    
    return 0;
}

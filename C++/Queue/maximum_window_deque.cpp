#include <iostream>
#include <vector>
#include <deque>
using namespace std;

vector<int> max_window(vector<int> &arr,int k){
    deque<int>dq;
    vector<int>result;
    for(int i=0 ; i<k ; i++){
        while(not dq.empty() and arr[dq.back()]<arr[i]){
            dq.pop_back();
        }
        dq.push_back(i);
    }
    result.push_back(arr[dq.front()]);

    for(int i=k ; i<arr.size() ; i++){
        int curr=arr[i];
        if(dq.front() == i-k){
            dq.pop_front();
        }
        while(not dq.empty() and arr[dq.back()]<arr[i]){
            dq.pop_back();
        }
        dq.push_back(i);
        result.push_back(arr[dq.front()]);
    }
    return result;
}

int main(){
    vector<int> array = {1, 3, -1, -3, 5, 3, 6, 7};
    int k=3;

    vector<int> ans = max_window(array, k);
    for(int i=0;i<ans.size();i++){
        cout<<ans[i]<<endl;
    }

    return 0;
}


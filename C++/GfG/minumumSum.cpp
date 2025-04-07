#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

using namespace std;

string minSum(vector<int>& arr) {
    string num1 = "" , num2 = "" ;
    sort(arr.begin(),arr.end());

    for(int i=0;i<arr.size();i++){

    }
}

int main(){
    vector<int> arr = {5, 3, 0, 7, 4};
    cout << "Minimum sum: " << minSum(arr) << endl; 
    return 0;
}
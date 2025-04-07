//given an integer array ,return the prefix sum/running sum in the same array without creating a new array.

#include<iostream>
#include<vector>

using namespace std;

void prefix(vector<int> &v){
    for(int i=1;i<v.size();i++){
    v[i]=v[i]+v[i-1];
    }

}
int main()
{
    int n;
    cout << "Enter the number of elements: ";
    cin >> n;

    vector<int> v(n);
    cout << "Enter the elements:" << endl;
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }

    prefix(v);
    cout<<"prefix sum:";

    for(int i=0;i<n;i++){
        cout<<v[i]<<" ";
    }
    cout<<endl;

    return 0;

}
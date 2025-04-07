#include<iostream>
#include<vector>
using namespace std;

int main()
{
    int n;
    cout<<"enter number of elements:";
    cin>>n;

    vector<int> v(n);
    cout<<"enter array elements:"<<endl;
    for(int i=0;i<n;i++){
        cin>>v[i];
    }
    const int N=1e5+10; //it is the scientific-notation of 10 to the power 5
    vector<int>freq(N,0);
    for(int i=0;i<n;i++){
        freq[v[i]]++;
    }
    cout<<"enter no. of queries:";
    int q;
    cin>>q;
    while(q--){
        int queryelement;
        cin>>queryelement;
        cout<<"the query is present "<<freq[queryelement]<<" times in the array."<<endl;
    }

    return 0;
}
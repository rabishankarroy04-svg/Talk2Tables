#include<iostream>
#include<vector>
using namespace std;

void selection_sort(vector<int> &v){
    int n = v.size();
    for(int i=0;i<n;i++){
        int min_index=i;  //finding minimum element in unsorted array
        for(int j=i+1;j<n;j++){
            if(v[j]<v[min_index]){
               min_index=j;
            }
//checking if the first element of the unsorted array is minimum element or not
            if(i!=min_index){
                swap(v[i],v[min_index]);
            }
        }
    }
return ;
}
int main()
{
    int n;
    cin>>n;

    vector<int>v(n);
    for(int i=0;i<n;i++){
        cin>>v[i];
    }

    selection_sort(v);

    for(int i=0;i<n;i++){
        cout<<v[i]<<" ";
    }
    cout<<endl;
return 0;
}
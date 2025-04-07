//check if prefixSUM=suffixSUM

#include<iostream>
#include<vector>
using namespace std;

void prefixsuffix(vector<int> &v){
    
    int left_ptr =0;
    int right_ptr=v.size()-1;

    int lft_sum=0;
    int right_sum=0;

    for(int i=0;i<v.size();i++){
        lft_sum=lft_sum+v[left_ptr];

    for(int i=v.size()-1;i>0;i--){
        right_sum=right_sum+v[right_ptr];
        right_ptr--;
    }
    if(lft_sum!=right_sum){
       left_ptr++;
    }
}
    if(lft_sum==right_sum){
        cout<<"ok"<<endl;
    }
    else{
        cout<<"not ok"<<endl;
    }
}

  
int main()
{
    int n;
    cout<<"Enter the number of elements:";
    cin>>n;
    
    cout<<"Enter elements:"<<endl;
    vector<int> v(n);
    for(int i=0;i<n;i++ ){
        cin>>v[i];
    }
    prefixsuffix(v);

    return 0;
}
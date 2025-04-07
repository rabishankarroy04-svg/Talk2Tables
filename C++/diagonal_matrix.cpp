#include<iostream>
using namespace std;
int main(){
    int m,n;
    cout<<"Enter number of rows:";
    cin>>m;
    cout<<"Enter number of columns:";
    cin>>n;

    int arr[m][n];
    cout<<"Enter array elements:";
    for(int i=0;i<m;i++){
        for(int j=0;j<n;j++){
            cin>>arr[i][j];
        }
    }
    cout<<"Inserted Matrix:"<<endl;
    for(int i=0;i<m;i++){
        for(int j=0;j<n;j++){
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<endl;

    cout<<"Diagonal Matrix:"<<endl;
    for(int i=0;i<m;i++){
        for(int j=0;j<n;j++){
            if(i==j){
                cout<<arr[i][j]<<" ";
            }
            else{
                cout<<0<<" ";
            }
        }
        cout<<endl;
    }

    return 0;
}
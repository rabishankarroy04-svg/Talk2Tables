#include<iostream>
using namespace std;

int main(){
    int row,col;

    cout<<"Enter number of rows of matrix:";
    cin>>row;
    cout<<"Enter number of columns of matrix:";
    cin>>col;

    int arr[row][col]; 
    
    //taking matrix input 
    cout<<"Enter the elements:";
    for(int i=0;i<row;i++){
        for(int j=0;j<col;j++){
            cin>>arr[i][j] ;
        }
    }
    cout<<endl;
    //printing the matrix
    cout<<"Inserted Matrix:"<<endl;
    for(int i=0;i<row;i++){
        for(int j=0;j<col;j++){
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<endl;
    //printing the transpose
    // cout<<"Transpose of the Matrix:"<<endl;
    // for(int i=0;i<row;i++){
    //     for(int j=0;j<col;j++){
    //         cout<<arr[j][i]<<" ";
    //     }
    //     cout<<endl;
    // }
    int transpose[col][row];
    //transposing the matrix
    for(int i=0;i<col;i++){
        for(int j=0;j<row;j++){
            transpose[i][j]=arr[j][i];
        }
    }
    cout<<"Transpose of the Matrix:"<<endl;
    for(int i=0;i<col;i++){
        for(int j=0;j<row;j++){
            cout<<transpose[i][j]<<" ";
        }
        cout<<endl;
    }
return 0;
}
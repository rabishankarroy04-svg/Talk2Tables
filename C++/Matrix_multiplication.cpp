#include<iostream>
using namespace std;

int main(){
    int row1,col1,row2,col2;
    // row1=row2=col1=col2=2;

    cout<<"Enter number of rows for the 1st matrix:";
    cin>>row1;
    cout<<"Enter number of columns for the 1st matrix:";
    cin>>col1;

    cout<<"Enter number of rows for the 2nd matrix:";
    cin>>row2;
    cout<<"Enter number of columns for the 2nd matrix:";
    cin>>col2;

 if(col1==row2){

    int arr1[row1][col1]; //= {{1,2},{3,4}};
    int arr2[row2][col2]; //= {{5,6},{7,8}};
    int c[row1][col2];

    //taking 1st matrix input 
    cout<<"Enter the elements:";
    for(int i=0;i<row1;i++){
        for(int j=0;j<col1;j++){
            cin>>arr1[i][j] ;
        }
    }
    //printing 1st matrix
    cout<<"1st Matrix:"<<endl;
    for(int i=0;i<row1;i++){
        for(int j=0;j<col1;j++){
            cout<<arr1[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<endl;
 
    
    //taking 2nd matrix input 
    cout<<"Enter the elements:";
    for(int i=0;i<row2;i++){
        for(int j=0;j<col2;j++){
            cin>>arr2[i][j] ;
        }
    }
    //printing 2nd matrix
    cout<<"2nd Matrix:"<<endl;
    for(int i=0;i<row2;i++){
        for(int j=0;j<col2;j++){
            cout<<arr2[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<endl;

    
    //Calculation
    for(int i=0;i<row1;i++){
        for(int j=0;j<col2;j++){
            int ans=0;
            for(int k=0;k<row2;k++){   //row1=col2
                ans += arr1[i][k]*arr2[k][j];
            }
            c[i][j]=ans;
        }
    }

    //Printing final multiplication result
    cout<<"Result Matrix:"<<endl;
    for(int i=0;i<row1;i++){
        for(int j=0;j<col2;j++){
            cout<<c[i][j]<<" ";
        }
        cout<<endl;
    }
 }
 else{
    cout<<endl;
    cout<<"Matrix Calculation is not possible as row number of 1st matrix is not equal to the column number of 2nd matrix."<<endl;
 }

return 0;
}
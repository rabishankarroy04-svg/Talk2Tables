#include<iostream>
#include<vector>
using namespace std;

bool perfect_or_not(int rows,int cols,const vector<vector<int>> &arr){ 
    for(int i=0;i<rows;i++){
        for(int j=0;j<cols;j++){
            if(arr[i][j]!=arr[i+1][j+1]){
                return false;
            }
        }
    }
    return true;
}

int main(){
    int rows,cols;
    cout<<"Enter rows:";
    cin>>rows;
    cout<<"Enter columns:";
    cin>>cols;
    
   vector<vector<int>> matrix(rows, vector<int>(cols));
    for(int i=0;i<rows;i++){
        for(int j=0;j<cols;j++){
            cin>>matrix[i][j];
        }
    }

    cout<<"Inserted Matrix:"<<endl;
    for(int i=0;i<rows;i++){
        for(int j=0;j<cols;j++){
            cout<<matrix[i][j];
        }
        cout<<endl;
    }
    
    perfect_or_not(rows,cols,matrix);
    
    if(perfect_or_not){
        cout<<"TRUE"<<endl;
    }
    else{
        cout<<"FALSE"<<endl;
    }
    
  return 0;
}

#include<iostream>
using namespace std;
const int MAX_SIZE = 100;

void display(int matrix[MAX_SIZE][MAX_SIZE] , int n){
  for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
          cout<<arr[i][j]<<" ";
        }
        cout<<endl;
    }
}

void input(int matrix[MAX_SIZE][MAX_SIZE],int n){
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
          cin>>arr[i][j];
        }
    }
}

int main(){
    int n;   //it is a n*n matrix.
    cout<<"Enter n(it's a n*n matrix):";
    cin>>n;

    int arr[MAX_SIZE][MAX_SIZE];
    cout<<"Enter array elements:";
    input(arr,n);

    cout<<"Inserted array:"<<endl;
    display(arr,n);

    int rotate[MAX_SIZE][MAX_SIZE];
    cout<<"Rotated array:"<<endl;
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
          if(j==n/2){
            rotate[i][j]=arr[j][i];
          }
       }
    }
    display(rotate,n);
return 0;
}

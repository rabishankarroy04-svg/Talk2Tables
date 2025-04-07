
#include<iostream>
#include<vector>
using namespace std;

int main() {
  int array[5];

  cout << "Enter the elements: "<<endl;

  for(int i=0;i<5;i++) {
    cin>>array[i];
  }

 for(int i=0;i<5;i++){
    for(int j=i+1;j<5;j++){
        if(array[i]==array[j]){
            array[i]=array[j]=-1;
        }
    }
 }
 for(int i=0;i<5;i++){
    if(array[i]>0){
        cout<<"unique element:"<<array[i]<<endl;
    }
 }
  return 0;
}

//Find the triplets from the elements of array that reaches the target sum 

#include<iostream>
#include<vector>
using namespace std;

int main() {
  int array[6];

  cout << "Enter the elements: "<<endl;

  for(int i=0;i<6;i++) {
    cin>>array[i];
  }
  cout<<"targetsum:";
  int x;
  cin>>x;

  int triplets=0;
  for(int i=0;i<6;i++){
    for(int j=i+1;j<6;j++){
        for(int k=j+1;k<6;k++){
        if(array[i]+array[j]+array[k]==x){
            triplets++;
        }
    }
  }
  }
  cout<<"triplets:"<<triplets<<endl;

return 0;
}
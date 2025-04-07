#include<iostream>
#include<vector>
using namespace std;

int largestElementIndex(int array[] , int size){
    int max=INT16_MIN;
    int maxindex=-1;
    for(int i=0;i<size;i++){
        if(array[i]>max){
            max=array[i];
            maxindex=i;
        }
    }
    return maxindex;
}

int main() {
  int array[6];
  int n=6;
  cout << "Enter the elements: "<<endl;

  for(int i=0;i<n;i++) {
    cin>>array[i];
  }
  int indexoflargest=largestElementIndex(array,6);

  array[indexoflargest=-1];
  int indexofsecondlargest=largestElementIndex(array,6);
  cout<<array[indexofsecondlargest]<<endl;

  return 0;
}
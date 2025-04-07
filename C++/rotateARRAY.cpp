//this program is using an extraarray(which causes extra memory) which may cause some garbage values.

#include<iostream>
#include<vector>
using namespace std;

int main() {
  int array[6];
  int n=6;
  cout << "Enter the elements: "<<endl;

  for(int i=0;i<n;i++) {
    cin>>array[i];
  }
  int k;
  cout<<"enter steps:";
  cin>>k;
  //k can be greater than size.
  k=k%n;

  int extraarray[6];
  int j=0;
  //inserting last k elements to extraarray
  for(int i=n-k;i<n;i++){
    extraarray[j++]=array[i];
  }
  //inserting first n-k elements to extraarray
  for(int i=0;i<=k;i++){
    extraarray[j++]=array[i];
  }
  for(int i=0;i<n;i++){
    cout<<extraarray[i]<<" ";
  }
  cout<<endl;
  return 0;
}
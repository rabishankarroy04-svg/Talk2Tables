//print true(1) if the array is elements of array are in correct order otherwise print false(0)

#include<iostream>
#include<vector>
using namespace std;

int main() {
  int array[6];

  cout << "Enter the elements: "<<endl;

  for(int i=0;i<6;i++) {
    cin>>array[i];
  }

  bool sorted = true;
  for (int i=0;i<6;i++) {
    if (array[i]>array[i+1]) {
      sorted = false;
      break;
    }
  }

  if (sorted) {
    cout << "The array is sorted" << endl;
  } else {
    cout << "The array is not sorted" << endl;

  }

  return 0;
}
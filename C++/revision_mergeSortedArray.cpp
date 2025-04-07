#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;


int main() {
    int m, n;
    vector<int>arr1 = {1,7,9,11};
    vector<int>arr2 = {0,4,7,15,22,30};
    m = arr1.size();
    n = arr2.size();

    vector<int> result(m + n); // Create a vector of size m + n

    int i = 0; //will help us to iterate on arr1
    int j = 0; //will help us to iterate on arr2
    int k = 0; //will help us to iterate on result

    while (i < m && j < n) { //both i and j should be within the limits of arr1 and arr2
        if (arr1[i] < arr2[j]) {
            result[k] = arr1[i];
            i++;
            k++;
        }
        else if (arr1[i] == arr2[j]) {
            result[k] = arr1[i];
            k++;
            result[k] = arr2[j];
            i++;
            j++;
            k++;
        }
        else {
            result[k] = arr2[j];
            j++;
            k++;
        }
     }
    while(i<m){ //arr1 was exhausted and arr2 still has elements left 
     result[k]=arr1[i];
     i++;
     k++;
    }
    while(j<n){ //arr2 was exhausted and arr1 still has elements left 
     result[k]=arr2[j];
     j++;
     k++;
    }
    cout<<"sorted array =";
    for(int k=0 ; k<(m+n) ; k++){
            cout<<result[k]<<" ";
    }

    return 0;

    }


        

//     vector<int>arr1[m];
//     cout<<"arr1 =" ;
//     for(int i=0 ; i<m ; i++){
//         cin>>arr1[i]>>" ";
//     }
//    vector<int>arr2[n];
//    cout<<"arr2 =" ;
//    for(int j=0 ; j<n ; j++){
//     cin>>arr2[j]>>" ";
//    }
//    vector<int>arr[m+n];
//    for(int k=0 ; k<(m+n) ; k++){
//     if(arr1[i]<arr2[j]){
//         arr.pushback(arr1[i]);
//     }
//     else if(arr1[i]=arr2[j]){
//         arr.pushback(arr1[i]);
//         arr.pushback(arr2[j]);
//     }
//         else{
//         arr.pushback(arr2[j]);
//     }
//    }
//   cout<<"sorted array = ["<<arr[m+n]<<" ]";

  
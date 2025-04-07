//tIME COMPLEXITY WHEN TRAVERSING 2 INDIVIDUAL ARRAYS OF LENGTH M AND N RESPECTIVELY 
#include<iostream>
using namespace std;

int main(){
     int arr1[]={1,2,3,4,5,6,7,8,9};
     int n=9;
     int arr2[]={11,12,13,14,15,16,17,18};
     int m=8;
     int sum1=0;
     int sum2=0;

     for(int i=0;i<n;i++){
        sum1+=arr1[i];
     }
    for(int i=0;i<m;i++){
        sum2+=arr2[i];
     }
     cout<<sum1<<" "<<sum2;
     return 0;
}

//input preparations we are gonna avoid. Time complexity = 0(n+m)
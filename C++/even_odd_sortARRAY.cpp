//in given array move all the even integers at the beginning and odd intergers at the ending without any order conditions


#include<vector>
#include<iostream>
#include<algorithm>
using namespace std;

void even_odd(vector<int> &v){
    int left_pointer=0;
    int right_pointer=v.size()-1;

    while(left_pointer<right_pointer){

        if(v[left_pointer]%2==1 && v[right_pointer]%2==0){
            swap(v[left_pointer],v[right_pointer]);
            left_pointer++;
            right_pointer--;
        }
        
        if(v[left_pointer]%2==0){
            left_pointer++;
        }
        if(v[right_pointer]%2==1){
            right_pointer--;
        }
    }
}

int main()
{
    int n;
    cout<<"enter no. of elements:";
    cin>>n;

    vector<int> v(n);
    cout<<"Enter the elements:"<<endl;
    for (int i=0;i<n;i++ ){     //Taking the input
       cin>>v[i];
    }

    even_odd(v);

    cout<<"sorted array:";
    for(int i=0;i<n;i++){
        cout<<v[i]<<" ";
    }
    cout<<endl;

    return 0;
}
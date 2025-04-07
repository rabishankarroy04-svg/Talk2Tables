//find the indices of last occurence of 'x' .

#include<iostream>
#include<vector>
using namespace std;
int main()
    {
      vector<int>v(6);
      for(int i=0;i<6;i++){
        cin>>v[i];
      }
      cout<<"Enter x:";
      int x;
      cin>>x;
      
      int occurence=-1;
      for(int i=0;i<v.size();i++){  //this loop will check elements from start.
        if(v[i]==x){
            occurence=i;
        }

      for(int i=v.size()-1;i>=0;i--){  //this loop will check elements from end.
        if(v[i]==x){
            occurence=i;
            break;
        }
      }
      }
      cout<<occurence<<endl;

      return 0;
    }

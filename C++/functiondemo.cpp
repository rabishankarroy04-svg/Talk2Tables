#include<iostream>
using namespace std ;

void fun(string);

int addition(int x,int y){
    //processing
    int result=x+y;
    return result;
}

int main()
{
   fun("sanket");
   int response=addition(9,8);
   cout<<response;
   return 0;
}

void fun(string name){
    cout<<"Are you having fun "<<name<<" ?"<<endl;
}

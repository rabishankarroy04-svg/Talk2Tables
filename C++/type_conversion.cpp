#include<iostream>
using namespace std;

int main(){
//explicit type conversion
    int x=98;
    char ch=(char)x;
    cout<<ch<<"\n";

    char yo='a';
    int y=(int)yo;
    cout<<y<<endl;

//implicit type conversion
    char moye='a';
    cout<<(moye+1);

    return 0;
}
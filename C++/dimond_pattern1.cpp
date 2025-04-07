#include<iostream>
using namespace std ;
int main()
{
    int n=5; //given input
    
    //UPPER TRIANGLE
    for(int i=1;i<=n;i++){
        //loop to print spaces
        for(int k=1;k<=(n-i);k++){
            cout<<" ";
        }
        //loop to print characters
        int chars=(2*i-1);
        for(int j=0;j<chars;j++){
            char ch=(char)('A'+j);
            cout<<ch;
        }
        cout<<endl;
    }

    //LOWER TRIANGLE 
        
        for(int i=n+1;i<=(2*n-1);i++){
         //loop to print spaces
            for(int k=1;k<=(i-n);k++){
            cout<<" ";
        }
        //loops to print characters
        int chars=2*(2*n-i)-1;
        for(int j=0;j<chars;j++){
            cout<<(char)('A'+j);
        }
        cout<<endl;
        }

        
    return 0;
}
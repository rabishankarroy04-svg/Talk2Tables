#include <iostream>
#include <string.h>
 
#define ms 100
using namespace std;

int main()
{
    char str1[ms];
    char str2[ms];
    char str3[ms];
    char str4[ms];
    int a,i,d2,i2,a3,i3,d3,i4,d4,t1,t2;
 
    a =  i = d2 = i2 = a3 = i3 = d3 = i4 = d4 = 0;

    cout << "Enter Your Name: ";
    cin.get(str1,100);
    cout << "Your Name is: " << str1 << endl;
         while(str1[i]!='\0')
    {
        if((str1[i]>='a' && str1[i]<='z') || (str1[i]>='A' && str1[i]<='Z'))
        {
            a++;
        }

        i++;
    }
 
    cout<<"Total letters in Name is: "<<a<<endl;

    cout << "\nEnter Your Date Of Birth: ";
    cin >> str2;
    cout << "Your Date Of Birth Is: "<< str2 <<endl;
        while(str2[i2]!='\0')
    {
    if(str2[i2]>='0' && str2[i2]<='9')
        {
            d2++;
        }
        i2++;
    }
 
    cout<<"Total Digits in Date Of Birth Is: "<<d2<<endl;
    
    cout << "\nEnter Your (City/Village/Street name/House No.): ";
    cin >> str3;
    cout << "Your (City/Village/Street name/House No.) is: " << str3 << endl;
    
            while(str3[i3]!='\0')
    {
        if((str3[i3]>='a' && str3[i3]<='z') || (str3[i3]>='A' && str3[i3]<='Z'))
        {
            a3++;
        }
        else if(str3[i3]>='0' && str3[i3]<='9')
        {
            d3++;
        }
        i3++;
    }
 
    cout<<"Total letters(City/Village/Street name/House No.) is: "<<a3<<endl;
    cout<<"Total Digits(City/Village/Street name/House No.) is: "<<d3<<endl;
    
    
    cout << "\nEnter Your Pin Code: ";
    cin >> str4;
    cout << "Your Pin Code is: " << str4 << endl;
    
 
         while(str4[i4]!='\0')
    {
        if(str4[i4]>='0' && str4[i4]<='9')
        {
            d4++;
        }
        i4++;
    }

    cout<<"Total Digits in pin code: "<<d4<<endl;
    
    t1=a+a3;
    t2=d2+d3+d4;
    
    cout<<"\nTotal letters: "<<t1<<endl;
    cout<<"\nTotal Digits : "<<t2<<endl;
    return 0;
}

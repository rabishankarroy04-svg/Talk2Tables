#include<iostream>
#include<vector>
using namespace std ;

int main()
{
    vector<int> v;

    cout<<"Size: "<<v.size()<<endl;
    cout<<"Capacity: "<<v.capacity()<<endl;

    v.push_back(1);
    cout<<"Size: "<<v.size()<<endl;
    cout<<"Capacity: "<<v.capacity()<<endl;

    v.push_back(2);
    cout<<"Size: "<<v.size()<<endl;
    cout<<"Capacity: "<<v.capacity()<<endl;

    v.push_back(3);
    cout<<"Size: "<<v.size()<<endl;
    cout<<"Capacity: "<<v.capacity()<<endl; 
    //here capacity size will not be same as size.it depends on compiler(ususally increases in the power of 2 OR multiple of 2)
    //and capacity>=size .

    return 0;
}
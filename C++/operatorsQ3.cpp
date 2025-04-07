#include<iostream>
using namespace std;
int main()
{
    int total,boys,girls;
    total=45;
    int A_grade;
    A_grade=(total*80)/100;
    boys=17;
    girls=(A_grade-boys);
    cout<<"No. of girls got 'A' grade:"<<girls;
    return 0;
}
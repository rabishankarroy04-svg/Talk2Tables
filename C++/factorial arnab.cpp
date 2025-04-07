#include<iostream>
using namespace std;
class f
{
	int fact;
	public:
	void factorial(int a);
	void display(void)
		{
		cout<<"\n Factorial value:"<<fact<<"\n";
    	}
};
void f :: factorial(int a)
{
	int i,n;
	n=a;
	fact=1;
	
	for(i=1;i<=n;i--)
	{
		fact=fact*i;
	}
}

int main()
{ 	int x;
	cout<<"\n enter the integer to calculate factorial:";
	cin>>x;
	f rec1; //create object rec1 of class student
	rec1.factorial(x);
	rec1.display();
	
	return 0;
}

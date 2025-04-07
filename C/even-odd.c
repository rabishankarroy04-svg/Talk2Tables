#include<stdio.h>
int main()
{
	int a,b;
	printf("Enter the number:");
	scanf("%d",&a);
	b=(a%2);
	if (b==0)
	{
		printf("The number is even.");
	}
	else 
	{
		printf("The number is odd.");
	}
	return 0 ;
}

#include<stdio.h>
int main()
{
	int age;
	printf("Enter your age:");
	scanf("%d",&age);
	if(age>=90)
	{
		printf("you cannot drive.");
	}
	else if(age>=18)
	{
		printf("you are elligible for driving.\n apply for your licese if you haven't applied yet..");
	}
	return 0;
}

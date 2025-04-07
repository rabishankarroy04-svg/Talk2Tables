#include<stdio.h>
int main()
{
	int mark[5],i;
	
	for(i=0;i<5;i++)
	{
		printf("enter the marks of students %d:",i+1);
		scanf("%d",& mark[i]);
	}
	for(i=0;i<5;i++)
	{
	  printf("the marks of the students %d is %d \n",i+1,mark[i]);
	}
	return 0;
}

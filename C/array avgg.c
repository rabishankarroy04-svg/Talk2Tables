#include<stdio.h>
int main()
{
	int mark[5],i,avg,sum=0;
	for(i=0;i<5;i++)
	{
		printf("enter the marks of the student %d:",i+1);
		scanf("%d",&mark[i]);
	}
	for(i=0;i<5;i++)
	{
		sum=sum+mark[i];
		avg=sum/5;
	}
	printf("the average will be:%d",avg);
	return 0;
}

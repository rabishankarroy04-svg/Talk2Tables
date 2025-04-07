#include<stdio.h>
int main()
{
	int i,n,m;
	printf("enter the number: ");
	scanf("%d",&n);
	for(i=0;i<=10;i++)
	{
		m=n*i;
		printf("%d*%d=%d \n",n,i,m);
	}
	return 0;
}

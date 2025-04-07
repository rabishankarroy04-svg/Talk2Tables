#include<stdio.h>
int main()
{
	int n,m,i;
	m=0;
	printf("Enter the number rate:");
	scanf("%d",&n);
	for(i=1;i<=n;i++)
	{
		m=m+i;
		printf("summation of n no. : %d",m);
	}
	return 0;
}

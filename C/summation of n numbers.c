#include<stdio.h>
int main()
{
	int i,s,n;
	s=0;
	printf("enter the range:");
	scanf("%d",&n);
	for(i=1;i<=n;i++)
	s=s+i;
	printf("summation will be: %d",s);
	return 0;
}

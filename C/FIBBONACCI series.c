#include<stdio.h>
int main()
{
	int i=3,a,b,c,n;
	printf("enter the range:");
	scanf("%d",&n);
	a=0;
	b=1;
	printf("Fibbonacci series of %d terms:",n);
	printf("%d %d",a,b);
	while(i<=n)
	{
		c=a+b;
		printf(" %d",c);
		a=b;
		b=c;
		i++;
	}
	return 0;
}

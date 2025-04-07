#include<stdio.h>
int main()
{
	int i,n,fact;
	printf("enter the number:");
	scanf("%d",&n);
	i=1;
	if(n<0)
	{
		printf("factorial of nrgative numbers doesn't exist.'");
	}
	else
	{
		while(i<=n)
		{
		fact*=i;
		i=i+1;
    	}
    	printf("factorial of the given number is:%d=%d",n,fact);
    }
    return 0;
    }


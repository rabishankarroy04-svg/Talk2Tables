#include<stdio.h>
#include<math.h>

double f(double x)
{
	return x*x;
}
main()
{
	int n,i;
	double a,b,h,x,sum=0,integral;
	printf("\n enter the no. of sub-intervals:");
	scanf("%d",&n);
	printf("\n enter the initial limit:");
	scanf("%if",&a);
	printf("\n enter the final limit:");
	scanf("%if",&b);
	
	h=fabs(b-a)/n;
	for(i=1;i<=n;i++)
	{
		x=a+i*h;
		sum=sum+f(x);
	}
	integral=(h/2)*(f(a)+f(b)+2*sum);
	printf("\n the integral is: %if\n",integral);
}

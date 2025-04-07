#include<stdio.h>
#include<math.h>
int main()
  {
	int a,b,c,d ;
	printf("enter your anual income:");
	scanf("%d",&a);
	
       if(a<250000)
	{
		printf("tax amount:0");
	}
	  else if(a>250000 && a<=500000)
	{
	 b=(a-250000)/20;
	 printf("tax amount: %d",b)	;
	}
	else if(a>500000 && a<=1000000)
	{
		c=((a-250000)*15)/100 ;
		printf("tax amount: %d",c);
	}
	else if(a>1000000)
	{
		d=(a-250000)/5 ;
		printf("tax amount: %d",d);
	}
  
	return 0;
}


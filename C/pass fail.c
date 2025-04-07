#include<stdio.h>
int main()
{
	int a,b,c;
	float d;
	printf("Math:");
	scanf("%d",&a);
	printf("\nphysics:");
	scanf("%d",&b);
	printf("\nchemistry:");
	scanf("%d",&c);
	d=(a+b+c)/3;
	if((a>=33) && (b>=33) && (c>=33) && (d>=40))
	{
		printf("YOU ARE PASS.");
	}
	else 
	{
		printf("YOU ARE FAIL.");
	}
	return 0;
}

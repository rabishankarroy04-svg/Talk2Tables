#include<stdio.h>
float force(float x);
int main()
{
	int m;
	float F;
	printf("enter the mass of the object:");
	scanf("%d",&m);
	F=force(m);
	printf("the force on the object will be:%f",F);
	return 0;
}

float force(float x)
{
	float g,y;
	g=9.8;
	y=(x*g);
	return y;
}

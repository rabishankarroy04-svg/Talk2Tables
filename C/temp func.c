#include<stdio.h>
float temp(float x);
int main()
{
	float x,y;
	printf("enter the temperature in celcius:");
	scanf("%f",&x);
	y=temp(x);
	printf("temperature in ferenhite:%f",y);
	return 0;
}

float temp(float x)
{
	float z;
	z=((9*x)/5)+32 ;
	return z;
	}	

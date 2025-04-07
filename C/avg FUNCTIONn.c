#include<stdio.h>
float avg(int x,int y,int z);
int main()
{
	int x,y,z;
	float g;
	printf("enter the 1st no: ");
	scanf("%d",&x);
	printf("enter the 2nd no: ");
	scanf("%d",&y);
	printf("enter the 3rd no: ");
	scanf("%d",&z);
	g=avg(x,y,z);
	printf("the average will be:%f",g);
	return 0;
}
float avg(int x,int y,int z)
{
	float a;
	a=(x+y+z)/3;
	return a;
}

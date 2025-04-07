#include<stdio.h>
int main()
{
  int a,b,c,d,e,f,g;
	printf("marks in bengali:");
	scanf("%d",&a);
	printf("marks in english:");
	scanf("%d",&b);
	printf("marks in mathematics:");
	scanf("%d",&c);
	printf("marks in physics:");
	scanf("%d",&d);
	printf("marks in chemistry:");
	scanf("%d",&e);
	f=(a+b+c+d+e);
	printf("Total marks: %d",f);
	g=(f/5);
	printf("\nPercentage: %d",g);
	return 0;	
}

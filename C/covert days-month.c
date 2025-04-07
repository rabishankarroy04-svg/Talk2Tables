#include<stdio.h>
int main()
{
	int a,month,day;
	printf("enter the no. of days:");
	scanf("%d",&a);
	month=a/30;
	day=a%30;
	printf("month=%d and day=%d",month,day);
	return 0;
}

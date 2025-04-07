#include<stdio.h>
int main()
{
	float marks;
	char grade;
	printf("enter marks:");
	scanf("%f",&marks);
	
		if(marks<0||marks>100)
	{
	printf("check the marks.");
	}
	    else if(marks>=90)
	    {
	    	grade='A';
		}
		else if(marks>=80&&marks<90)
		{
			grade='B';
		}
		else if(marks>=70&&marks<80)
		{
			grade='C';
		}
		else if(marks>=60&&marks<70)
		{
			grade='D';
		}
		else if(marks>=50&&marks<60)
		{
			grade='E';
		}
		else if(marks<50)
		{
			grade='F';
		}
		printf("grade=%c",grade);
		
		return 0;
}

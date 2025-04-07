#include<stdio.h>
#include<stdlib.h>

int main(){
	int mark[5],i,avg,sum=0;
	printf("Enter numbers:\n");
	for(i=1;i<6;i++){ 
		printf("mark[%d]=",i+1);
	 	scanf("%d",& mark[i]);
		sum=sum+mark[i];
	}
	avg=sum/5;
	printf("Average is %d", avg);
	
	return 0;
}

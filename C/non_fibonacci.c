#include <stdio.h>
int main() 
{
    int n,i,a,b,c,d,difference;

    a=1;
    b=1;
    printf("The non-fibbonacci series is:\n");
    for(i=1;i<=10;i++){  
    c=(a+b);
    difference=(c-b);
    
    if(difference>1){
    	for(d=b+1;d<c;d++){
    		printf("%d ",d);
		}
    }
	a=b;
	b=c; 
	}
return 0;		
}
    


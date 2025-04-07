#include<stdio.h>
int main()
{
    int calls;
    float bill;
    printf("Number of Calls:");
    scanf("%d",&calls);
    
    if(calls<450){
      if(calls>300){
        if(calls>375){
         bill=(300+((calls-300)*0.85));   
        }
        else{
            bill=(300+((calls-300)*0.75));
        }
      }
      else{
        bill=300;
      }
    }
    else{
        bill=(300+((calls-300)*1.25));
    }
    printf("Amount of phone bill(Rs.): %0.2f",bill);
    return 0;
}
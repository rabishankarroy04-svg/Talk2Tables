#include <stdio.h>

int main()
{
    int calls;
    float bill;
    printf("Enter the number of calls: ");
    scanf("%d",&calls);
    
    if(calls <= 300) {
        bill = 300;
    }
    else if(calls <= 375){
        bill = 300 + ((calls - 300) * 0.75);
    }
    else if(calls <= 450){
        bill = 300 + ((calls - 300) * 0.85);
    }
    else {
        bill = 300+ ((calls - 300) * 1.25);
    }
    printf("Telephone bill is: %f",bill);

    return 0;
}
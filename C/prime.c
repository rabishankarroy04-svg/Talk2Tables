#include <stdio.h>

int main() {
    int num;

    printf("Enter a number: ");
    scanf("%d", &num);
    
    int i;
    for ( i = 2; i <= num; i++) {
        if (num % i == 0 && i!=num) {
            printf("%d is not a prime number.\n", num);
        }
        else{
        	printf("%d is a prime number.\n", num);
		}
    }

    return 0;
}


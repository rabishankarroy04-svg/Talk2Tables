#include <stdio.h>
#include <stdlib.h>

void print_array(int array[], int low, int high) {
    int i;
    for(i = low; i <= high; i++) {  
        printf("%d ", array[i]);
    }
    printf("\n");
}

int division_iterative(int array[], int low, int high, int element) {
    while(high >= low) {
        int mid = (low + high) / 2;
        
        printf("\nMid Element: %d at index %d\n", array[mid], mid);  
        
        if (array[mid] == element)
            return mid;
        
        if (array[mid] > element) {
            high = mid - 1;
            printf("\nLeft Side: ");
            print_array(array, low, high);
        }
        else {
            low = mid + 1;
            printf("\nRight Side: ");
            print_array(array, low, high);
        }
    }
    return -99;
}

int division_recursive(int array[], int low, int high, int element) {
    if (high >= low) {
        int mid = (low + high) / 2;
        
        printf("\nMid Element: %d at index %d\n", array[mid], mid);  
        
        if (array[mid] == element)
            return mid;
        
        if (array[mid] > element) {
            printf("\nLeft Side: ");
            print_array(array, low, mid - 1);
            return division_recursive(array, low, mid - 1, element);
        }
        else {
            printf("\nRight Side: ");
            print_array(array, mid + 1, high);
            return division_recursive(array, mid + 1, high, element);
        }
    }
    return -99;
}

int main() {
    int *arr, i, x, y, n, choice;
    
    printf("Enter size of array: ");
    scanf("%d", &n);
    
    arr = (int *)malloc(n * sizeof(int));  
    
    printf("\nEnter a sorted array:\n");
    for(i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    printf("\nEnter the element you want to search: ");
    scanf("%d", &x);
    
    printf("\nEnter 1 for Recursive Approach\nEnter 2 for Iterative Approach\nEnter Choice: ");
    scanf("%d", &choice);
    
    switch(choice) {
        case 1:
            y = division_recursive(arr, 0, n - 1, x);  
            break; 
        case 2:
            y = division_iterative(arr, 0, n - 1, x);  
            break; 
        default:
            printf("Invalid choice\n");
            return -1;
    }
    
    if(y == -99)
        printf("\n%d element is not present in the array.\n", x);
    else
        printf("\n%d element is present in the array at index: %d\n", x, y);
    
    free(arr);
    
    return 0;
}


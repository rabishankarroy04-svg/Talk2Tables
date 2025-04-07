#include <stdio.h>

int stepCount = 0; // Global variable to track step numbers

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[], int low, int high) {
    int p = arr[low]; // Pivot
    int i = low;
    int j = high;

    while (i < j) {
        // Find the first element greater than the pivot (from the start)
        while (arr[i] <= p && i <= high - 1) {
            i++;
        }

        // Find the first element smaller than the pivot (from the end)
        while (arr[j] > p && j >= low + 1) {
            j--;
        }

        if (i < j) {
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[low], &arr[j]);
    return j;
}

void printArray(int arr[], int size) {
	int i;
    for (i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

void quickSort(int arr[], int low, int high, int n) {
    if (low < high) {
        // Call partition function to find Partition Index
        int pi = partition(arr, low, high);

        // Print the array to show steps
        stepCount++;
        printf("Step %d (low=%d, high=%d, pivot=%d): ", stepCount, low, high, arr[pi]);
        printArray(arr, n);

        // Recursively call quickSort() for left and right halves
        quickSort(arr, low, pi - 1, n);
        quickSort(arr, pi + 1, high, n);
    }
}

int main() {
    int i, n;
    int arr[50];

    printf("Enter array size: ");
    scanf("%d", &n);

    printf("Enter elements of array: ");
    for (i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    printf("\nQuick Sort Steps:\n");
    quickSort(arr, 0, n - 1, n);

    printf("\nSorted Array: ");
    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    return 0;
}


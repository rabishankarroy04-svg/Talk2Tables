#include <stdio.h>

void printArray(int arr[], int low, int high, int depth) {
    int i;
    for (i = 0; i < depth; i++) {
        printf("  "); // Indentation based on depth
    }
    for (i = low; i <= high; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

void merge(int arr[], int low, int mid, int high, int depth) {
    int temp[50],d;
    int i = low; // Initialize `i` for indexing `temp`
    int left = low, right = mid + 1;

    // Before merging
    for ( d = 0; d < depth; d++) {
        printf("  ");
    }
    printf("Merging: ");
    printArray(arr, low, high, 0);

    while (left <= mid && right <= high) {
        if (arr[left] < arr[right]) {
            temp[i] = arr[left];
            left++;
        } else {
            temp[i] = arr[right];
            right++;
        }
        i++;
    }

    while (left <= mid) {
        temp[i] = arr[left];
        left++;
        i++;
    }

    while (right <= high) {
        temp[i] = arr[right];
        right++;
        i++;
    }

    for (i = low; i <= high; i++) {
        arr[i] = temp[i];
    }

    // After merging
    for ( d = 0; d < depth; d++) {
        printf("  ");
    }
    printf("After merging: ");
    printArray(arr, low, high, 0);
}

void mergeSort(int arr[], int low, int high, int depth) {
	int i;
    if (low < high) {
        int mid = (low + high) / 2;

        // Before sorting left half
        for ( i = 0; i < depth; i++) {
            printf("  ");
        }
        printf("Sorting left half: ");
        printArray(arr, low, mid, 0);

        mergeSort(arr, low, mid, depth + 1);

        // Before sorting right half
        for ( i = 0; i < depth; i++) {
            printf("  ");
        }
        printf("Sorting right half: ");
        printArray(arr, mid + 1, high, 0);

        mergeSort(arr, mid + 1, high, depth + 1);

        merge(arr, low, mid, high, depth);
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

    printf("\nMerge Sort Steps:\n");
    mergeSort(arr, 0, n - 1, 0);

    printf("\nSorted Array: ");
    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    return 0;
}


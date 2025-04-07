#include<stdio.h>

void insertionSort(int arr[],int size){
	int i,k;
	for(i=1; i<size; i++){
	int j = i-1;
	int curr = arr[i];
	
	while(j>=0 && curr<arr[j]){
	arr[j+1] = arr[j];
	j--;
	}
	arr[j+1] = curr;
	printf("\n Step %d: ", i);
	for(k=0; k<size; k++){
	printf("%d ",arr[k]);
	}
	
	}
}

int main(){
	int i,n;
	int arr[50];
	
	printf("Enter array size:");
	scanf("%d",&n);
	
	printf("Enter elements of array:");
	for(i=0 ; i<n; i++){
	scanf("%d",&arr[i]);
	}
	
	printf("\n Insertion Sort:");
	insertionSort(arr, n);
	printf("\n\nSorted Array:");
	for(i=0 ; i<n; i++){
	printf("%d ",arr[i]);
	}			
	return 0;
}

#include <stdio.h>

struct item {
    int profit, weight;
    double ratio;
};

void sort(struct item object[], int n) {
    struct item temp;
    int i, j;
    for(i = 0; i < n - 1; i++) {   
        for(j = i + 1; j < n; j++) {  
            if(object[i].ratio < object[j].ratio) { 
                temp = object[i];
                object[i] = object[j];
                object[j] = temp;
            }
        }
    }
}

double knapsack(struct item object[], int capacity, int n) {
    sort(object, n); 
    double maxprofit = 0.0;
    int i;

    for(i = 0; i < n; i++) {
        if(capacity >= object[i].weight) {  
            maxprofit += object[i].profit;
            capacity -= object[i].weight;
        }
        else { 
            maxprofit += object[i].ratio * capacity;
            break;
        }
    }

    return maxprofit;
}

int main() {
    int i, n, cap; // n = number of objects, cap = knapsack capacity
    
    printf("\nEnter number of objects: ");
    scanf("%d", &n);

    printf("\nEnter knapsack capacity: ");
    scanf("%d", &cap);

    struct item obj[n];

    printf("\nEnter profits and weights of objects:\n");
    for(i = 0; i < n; i++) {
        printf("Enter profit of object %d: ", i + 1);
        scanf("%d", &obj[i].profit);
        printf("Enter weight of object %d: ", i + 1);
        scanf("%d", &obj[i].weight);
        obj[i].ratio = (double)obj[i].profit / obj[i].weight;  
    }

    double max_profit = knapsack(obj, cap, n);
    printf("\nMaximum profit: %.2f\n", max_profit);

    return 0;
}


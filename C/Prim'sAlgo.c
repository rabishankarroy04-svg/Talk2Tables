#include <stdio.h>
#include <limits.h>
#include <stdbool.h>

#define V 5  // Number of vertices in the graph

int minKey(int key[], bool mstSet[]) {
    int min = INT_MAX, min_index;
    int v;

    for (v = 0; v < V; v++)
        if (!mstSet[v] && key[v] < min)
            min = key[v], min_index = v;

    return min_index;
}

void printAllEdges(int graph[V][V]) {
    printf("\nAll Edges in the Graph:\n");
    printf("Edge\tWeight\n");

    int i, j;
    for (i = 0; i < V; i++) {
        for (j = i + 1; j < V; j++) {
            if (graph[i][j] != 0)
                printf("%d - %d\t%d\n", i, j, graph[i][j]);
        }
    }
}

int printMST(int parent[], int graph[V][V]) {
    int sum = 0;
    int i;

    printf("\nEdges in the MST:\n");
    printf("Edge\tWeight\n");

    for (i = 1; i < V; i++) {
        printf("%d - %d\t%d\n", parent[i], i, graph[i][parent[i]]);
        sum += graph[i][parent[i]];
    }

    printf("\nSum of MST: %d\n", sum);
    return sum;
}

void primMST(int graph[V][V]) {
    int parent[V];       
    int key[V];          
    bool mstSet[V];      

    int i, count, u, v;

    // Initialize all keys as INFINITE
    for (i = 0; i < V; i++) {
        key[i] = INT_MAX;
        mstSet[i] = false;
    }

    key[0] = 0;           
    parent[0] = -1;       

    for (count = 0; count < V - 1; count++) {
        u = minKey(key, mstSet);  // Pick the minimum key vertex not yet included in MST
        mstSet[u] = true;

        for (v = 0; v < V; v++) {
            if (graph[u][v] && !mstSet[v] && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }

    printAllEdges(graph);
    printMST(parent, graph);
}

int main() {
    int graph[V][V] = {
        {0, 2, 0, 6, 0},
        {2, 0, 3, 8, 5},
        {0, 3, 0, 0, 7},
        {6, 8, 0, 0, 9},
        {0, 5, 7, 9, 0}
    };

    printf("Graph and Minimum Spanning Tree using Prim's Algorithm:\n");
    primMST(graph);

    return 0;
}


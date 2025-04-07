#include<stdio.h>

void input(int arr[],int rows,int cols){
    int i,j;
    for(int i=0;i<rows;i++){
        for(int j=0;j<cols;j++){
            scanf("%d",&arr[i][j]) ;
        }
    }
}
void print(int arr[],int rows,int cols){
    int i,j;
     for(int i=0;i<rows;i++){
        for(int j=0;j<cols;j++){
            printf("%d ",arr[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}

int main(){
    int row1,col1,row2,col2;
    // row1=row2=col1=col2=2;

    printf("Enter number of rows for the 1st matrix:");
    scanf("%d",&row1);
    printf("Enter number of columns for the 1st matrix:");
    scanf("%d",&col1);

    printf("Enter number of rows for the 2nd matrix:");
    scanf("%d",&row2);
    printf("Enter number of columns for the 2nd matrix:");
    scanf("%d",&col2);

 if(col1==row2){

    int arr1[row1][col1]; //= {{1,2},{3,4}};
    int arr2[row2][col2]; //= {{5,6},{7,8}};
    int c[row1][col2];

    //taking 1st matrix input 
    printf("Enter the elements of 1st Matrix:");
    input(arr1,row1,col1);

    //printing 1st matrix
    printf("1st Matrix:\n");
    print(arr1,row1,col1);
    
    //taking 2nd matrix input 
    printf("Enter the elements of 2nd Matrix:");
    input(arr2,row2,col2);

    //printing 2nd matrix
    printf("2nd Matrix:\n");
    print(arr1,row1,col1);

    
    //Calculation
    for(int i=0;i<row1;i++){
        for(int j=0;j<col2;j++){
            int ans=0;
            for(int k=0;k<row2;k++){   //row1=col2
                ans += arr1[i][k]*arr2[k][j];
            }
            c[i][j]=ans;
        }
    }

    //Printing final multiplication result
    printf("Result Matrix:\n");
    
    print(c,row1,col2);

 }
 else{
    printf("\n");
    printf("Matrix Calculation is not possible as row number of 1st matrix is not equal to the column number of 2nd matrix.\n");
 }

return 0;
}
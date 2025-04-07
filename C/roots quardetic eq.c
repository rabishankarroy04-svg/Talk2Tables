 #include<stdio.h>
#include<math.h>
 
int main()
{
  int a,b,c;
	float d,root1,root2;
	printf("enter 1st no's:");
	scanf("%d",&a);
  printf("enter 2nd no's:");
	scanf("%d",&b);
  printf("enter 3rd no's:");
	scanf("%d",&c);
	d=(b*b)-(4*a*c);
  
  if(d < 0)
{
    printf("Roots are complex number");
  }
  else if(d==0)
{
   printf("Both roots are equal");
   }
  else{
   root1 = ( -b + sqrt(d)) / (2* a);
   root2 = ( -b - sqrt(d)) / (2* a);
   printf("Roots are: %.2f , %.2f",root1,root2);
  }
 
  return 0;
}

#include<iostream>
using namespace std;

int main()
{
int N;
cin>>N;
int alex=0;
int bob=0;

int A[N];

if(N%2==0){
for(int i=0;i<N;i++){
cin>>A[i];
}
int alex=0;
int bob=0;
for(int i=0;i<N;i++){

if(i%2==0){
alex+=A[i];
}
else{
bob+=A[i];
}
}
}
else {
    for(int i=0;i<N;i++){
cin>>A[i];
}
int alex=0;
int bob=0;

for(int i=0;i<N-1;i++){
if(i%2==0){
alex+=A[i];
}
else{
bob+=A[i];

}
}
}

if(alex>bob){
cout<<"Alex."<<endl;
}
else{
cout<<"Bob."<<endl;
}

return 0;
}
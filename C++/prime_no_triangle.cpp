#include <iostream>
#include <cmath>
using namespace std;
int main()
{
    int n, i, j;
    cout << "Enter the number of rows: ";
    cin >> n;
    for (i = 1; i <= n; i++) {
        for (j = 1; j <= i; j++) {
            if (isPrime(j))
                cout << j << " ";
            else
                cout << "   ";
        }
        cout << endl;
    }
    return 0;
}
int isPrime(int n)
{
    if (n == 1)
        return 0;
    for (int i = 2; i <= sqrt(n); i++) {
        if (n % i == 0)
            return 0;
    }
    return 1;
}

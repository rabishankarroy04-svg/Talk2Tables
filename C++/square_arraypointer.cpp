#include <vector>
#include <iostream>
#include<algorithm>
using namespace std;

void square(vector<int> &v) {
    vector<int> x = v; // Copy the elements of v to x
    int left_pointer = 0;
    int right_pointer = x.size() - 1;

    while (left_pointer < right_pointer) {
        if (abs(x[left_pointer]) < abs(x[right_pointer])) {
            x[right_pointer] = x[right_pointer] * x[right_pointer];
            right_pointer--;
        } else {
            x[left_pointer] = x[left_pointer] * x[left_pointer];
            left_pointer++;
        }
    }

    //it says non decreasing order..means increasing order..if it was said decreasing order we'll simply add " reverse(x.begin(), x.end()); " and it'll be reversed :)


    cout << "Squared array: ";
    for (int i = 0; i < x.size(); i++) {
        cout << x[i] << " ";
    }
    cout << endl;
}

int main() {
    int n;
    cout << "Enter the number of elements: ";
    cin >> n;

    vector<int> v(n);
    cout << "Enter the elements:" << endl;
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }

    square(v);

    return 0;
}

#include <iostream>
#include <string>

using namespace std;

// Function to decrypt a Caesar cipher encrypted text
string decryptCaesarCipher(string ciphertext, int shift) {
    string decryptedText = "";

    // Loop through each character in the ciphertext
    for (char& c : ciphertext) {
        // Decrypt only alphabetical characters
        if (isalpha(c)) {
            // Determine if it's uppercase or lowercase
            char base = isupper(c) ? 'A' : 'a';
            // Perform the reverse shift to decrypt
            c = (c - base - shift + 26) % 26 + base;
        }
        decryptedText += c;
    }

    return decryptedText;
}

int main() {
    string ciphertext;
    int shift;

    // Get input from the user
    cout << "Enter the encrypted text: ";
    getline(cin, ciphertext);
    cout << "Enter the shift value: ";
    cin >> shift;

    // Decrypt the text and display the result
    cout << "Decrypted text: " << decryptCaesarCipher(ciphertext, shift) << endl;

    return 0;
}

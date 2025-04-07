from tkinter import *
import string

playfair_matrix = []

def enter_word():
    input_word = word_entry.get().strip()
    if not input_word:
        word_label.config(text="Please enter a valid word!")
    else:
        formatted_word = format_word_for_playfair(input_word)
        if not playfair_matrix:
            word_label.config(text="Please enter a valid keyword first!")
            return
        encryption_steps, encrypted_word = encrypt_word(formatted_word, playfair_matrix)
        word_label.config(
            text=f"Entered Word: {input_word}\nFormatted for Playfair: {formatted_word}\n\nEncryption Rules:\n{encryption_rules()}\n\nEncryption Steps:\n{encryption_steps}\nEncrypted Word: {encrypted_word}"
        )

def format_word_for_playfair(word):
    word = word.upper().replace('J', 'I')
    formatted = []
    i = 0

    while i < len(word):
        char1 = word[i] 
        if i + 1 < len(word):
            char2 = word[i + 1] 
        else:
            char2 = None 

        if char2 is None or char1 == char2:
            formatted.append(char1 + 'X') 
            i += 1
        else:
            formatted.append(char1 + char2)
            i += 2

    return ' '.join(formatted)

def enter_keyword():
    global playfair_matrix
    key_word = keyword_entry.get().strip()
    if not key_word:
        result_label.config(text="Please enter a valid keyword!")
        return
    missing_alphabets = find_missing_alphabets(key_word)
    result_label.config(text=f"Entered Keyword: {key_word}\nMissing Alphabets: {missing_alphabets}")

def find_missing_alphabets(input_string):
    global playfair_matrix  
    all_alphabets = set(string.ascii_lowercase) - {'j'}
    input_alphabets = []
   
    for char in input_string.lower().replace('j', 'i'):
        if char in all_alphabets and char not in input_alphabets:
            input_alphabets.append(char)

    missing_alphabets = sorted(all_alphabets - set(input_alphabets))
    playfair_matrix = matrix_elements(input_alphabets, missing_alphabets) 
    return ''.join(missing_alphabets)

def matrix_elements(input_alphabets, missing_alphabets):
    all_chars = input_alphabets + missing_alphabets
    arr = []
    index = 0
    rows, cols = 5, 5
   
    for i in range(rows):
        row_temp = []
        for j in range(cols):
            if index < len(all_chars):
                row_temp.append(all_chars[index].upper())  
                index += 1
            else:
                row_temp.append('')
        arr.append(row_temp)

    # Display matrix in the GUI
    matrix_str = "\n".join([" ".join(row) for row in arr])
    matrix_label.config(text=f"Playfair Cipher Matrix:\n{matrix_str}")
    return arr

def encrypt_word(formatted_word, matrix):
    encrypted_pairs = []
    encryption_steps = []
    pairs = formatted_word.split()

    for pair in pairs:
        char1, char2 = pair[0], pair[1]
        row1, col1 = find_position_in_matrix(char1, matrix)
        row2, col2 = find_position_in_matrix(char2, matrix)

        if row1 == row2:  # Same row
            encrypted_char1 = matrix[row1][(col1 + 1) % 5]
            encrypted_char2 = matrix[row2][(col2 + 1) % 5]
            encryption_steps.append(f"Pair: {pair} -> {encrypted_char1}{encrypted_char2}")
            encrypted_pairs.append(encrypted_char1 + encrypted_char2)
        elif col1 == col2:  # Same column
            encrypted_char1 = matrix[(row1 + 1) % 5][col1]
            encrypted_char2 = matrix[(row2 + 1) % 5][col2]
            encryption_steps.append(f"Pair: {pair} -> {encrypted_char1}{encrypted_char2}")
            encrypted_pairs.append(encrypted_char1 + encrypted_char2)
        else:  # Rectangle rule
            encrypted_char1 = matrix[row1][col2]
            encrypted_char2 = matrix[row2][col1]
            encryption_steps.append(f"Pair: {pair} -> {encrypted_char1}{encrypted_char2}")
            encrypted_pairs.append(encrypted_char1 + encrypted_char2)

    return '\n'.join(encryption_steps), ' '.join(encrypted_pairs)

def find_position_in_matrix(char, matrix): 
    for i, row in enumerate(matrix):
        if char in row:
            return i, row.index(char)
    return None, None

def encryption_rules():
    rules = (
        "1. Same Row: Replace characters with the ones to their immediate right (wrap around if needed)."
        "\n2.Same Column: Replace characters with the ones immediately below them (wrap around if needed)."
        "\n3.Rectangle Rule: Swap characters to form the opposite corners of the rectangle."
    )
    return rules

# GUI setup
window = Tk()
window.geometry("400x600")
window.title("Playfair Cipher")

# Keyword input
Label(window, text="Enter keyword:", font=("Helvetica", 12, "bold")).grid(column=0, row=0, sticky=W, padx=5, pady=5)
keyword_entry = Entry(window, width=20)
keyword_entry.grid(column=1, row=0, padx=5, pady=5)
Button(window, text="Enter", bg="grey", command=enter_keyword).grid(column=2, row=0, padx=5, pady=5)

# Word input
Label(window, text="Enter a word:", font=("Helvetica", 12, "bold")).grid(column=0, row=1, sticky=W, padx=5, pady=5)
word_entry = Entry(window, width=20)
word_entry.grid(column=1, row=1, padx=5, pady=5)
Button(window, text="Enter", bg="grey", command=enter_word).grid(column=2, row=1, padx=5, pady=5)

# Keyword and missing alphabets result
result_label = Label(window, text="", wraplength=400, justify=LEFT)
result_label.grid(column=0, row=2, columnspan=3, sticky=W, padx=5, pady=5)

# Matrix display
matrix_label = Label(window, text="", wraplength=400, justify=LEFT)
matrix_label.grid(column=0, row=3, columnspan=3, sticky=W, padx=5, pady=5)

# Word display
word_label = Label(window, text="", wraplength=400, justify=LEFT)
word_label.grid(column=0, row=4, columnspan=3, sticky=W, padx=5, pady=5)

window.mainloop()

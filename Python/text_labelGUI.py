import tkinter as tk

# Create the main window
root = tk.Tk()
root.title("Label and Textbox Example")

# Set window size
root.geometry("300x200")

# Create a Label widget
label1 = tk.Label(root, text="Enter your name:")
label1.pack(pady=10)

# Create a Textbox widget for user input
entry1 = tk.Entry(root)
entry1.pack(pady=10)

# Create another Label widget
label2 = tk.Label(root, text="Enter your age:")
label2.pack(pady=10)

# Create another Textbox widget for user input
entry2 = tk.Entry(root)
entry2.pack(pady=10)

# Function to display the entered data
def show_data():
    name = entry1.get()  # Get text from the first textbox
    age = entry2.get()   # Get text from the second textbox
    result_label.config(text=f"Hello {name}, Age: {age}")

# Create a Button to trigger the action
button = tk.Button(root, text="Submit", command=show_data)
button.pack(pady=10)

# Create a Label to display the result
result_label = tk.Label(root, text="")
result_label.pack(pady=10)

# Run the GUI loop
root.mainloop()

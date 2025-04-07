import tkinter as tk

# Function to calculate and display the sum
def calculate_sum():
    try:
        num1 = float(entry1.get())  # Get the first number
        num2 = float(entry2.get())  # Get the second number
        result = num1 + num2
        result_label.config(text=f"Sum: {result}")
    except ValueError:
        result_label.config(text="Please enter valid numbers")

# Function to calculate and display the difference
def calculate_difference():
    try:
        num1 = float(entry1.get())  # Get the first number
        num2 = float(entry2.get())  # Get the second number
        result = num1 - num2
        result_label.config(text=f"Difference: {result}")
    except ValueError:
        result_label.config(text="Please enter valid numbers")

# Create the main window
root = tk.Tk()
root.title("Sum and Difference Calculator")
root.geometry("300x250")  # Set the window size

# Create a label and text box for the first number
label1 = tk.Label(root, text="Enter the first number:")
label1.pack(pady=5)
entry1 = tk.Entry(root)
entry1.pack(pady=5)

# Create a label and text box for the second number
label2 = tk.Label(root, text="Enter the second number:")
label2.pack(pady=5)
entry2 = tk.Entry(root)
entry2.pack(pady=5)

# Create a button to calculate the sum
sum_button = tk.Button(root, text="Calculate Sum", command=calculate_sum)
sum_button.pack(pady=10)

# Create a button to calculate the difference
diff_button = tk.Button(root, text="Calculate Difference", command=calculate_difference)
diff_button.pack(pady=10)

# Create a label to display the result
result_label = tk.Label(root, text="")
result_label.pack(pady=10)

# Run the GUI loop
root.mainloop()

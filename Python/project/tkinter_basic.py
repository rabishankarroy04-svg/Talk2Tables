import tkinter
from tkinter import ttk, BooleanVar, scrolledtext, messagebox


def clicked():
    label1.configure(text="Button is Clicked!!")


def clicked1():
    user_input = text.get()
    if user_input.strip():
        res = "Welcome to " + user_input
        label2.configure(text=res)
    else:
        label2.configure(text="Please enter some text!")


def combo_selected(event):
    label1.configure(text=f"Selected: {combo.get()}")


def message_box():
    messagebox.showinfo("Message For YOU", "Good Night:)")


def hi(event):
    label_hello = tkinter.Label(window, text="Hello")
    label_hello.grid(column=1, row=11)

def left_clicked(event):
    label3.configure(text="Left Button is clicked!")


def right_clicked(event):
    label3.configure(text="Right Button is clicked!")


def middle_clicked(event):
    label3.configure(text="Middle Button is clicked!")


# Create the main window
window = tkinter.Tk()
window.title("GUI")
window.geometry("700x500")

# Create a label and place it using grid
label1 = tkinter.Label(window, text="Welcome to the world of Tkinter!")
label1.grid(column=0, row=0)

# Button to change label text
button1 = tkinter.Button(window, text="Enter", bg="grey", fg="yellow", command=clicked)
button1.grid(column=1, row=0)

# Create another label with font styling and place it using grid
label2 = tkinter.Label(window, text="HAPPY EDUCATION DAY", font=("Arial Bold", 15))
label2.grid(column=0, row=3)

# Entry widget
text = tkinter.Entry(window, width=10)
text.grid(column=0, row=4)

# Button to update label2 based on Entry content
bt = tkinter.Button(window, text="Submit", command=clicked1)
bt.grid(column=1, row=4)

# Combobox widget
combo = ttk.Combobox(window)
combo['values'] = (1, 2, 3, 4, 5, "Text")
combo.current(0)
combo.grid(column=2, row=4)

# Bind the Combobox selection event
combo.bind("<<ComboboxSelected>>", combo_selected)

# Checkbox widget
check_state = BooleanVar()
check_state.set(False)
check = tkinter.Checkbutton(window, text="Check Box", var=check_state)
check.grid(column=0, row=5)

# Radiobuttons
rad1 = tkinter.Radiobutton(window, text="Python", value=1)
rad2 = tkinter.Radiobutton(window, text="Java", value=2)
rad3 = tkinter.Radiobutton(window, text="Ruby", value=3)
rad1.grid(column=0, row=6)
rad2.grid(column=1, row=6)
rad3.grid(column=2, row=6)

# ScrolledText widget
txt = scrolledtext.ScrolledText(window, width=30, height=5)
txt.insert(tkinter.INSERT, "This is a scrolled text box.")
txt.grid(column=1, row=7)

# Message Box Button
button2 = tkinter.Button(window, text="Message Box", command=message_box, padx=50, pady=10)
button2.grid(column=1, row=8)

# Spinbox widget
spin = tkinter.Spinbox(window, from_=0, to=5, width=3)
spin.grid(column=0, row=9)

# Event Binding Button
label3 = tkinter.Label(window, text="Bind Button")
label3.grid(column=0, row=10)

button3 = tkinter.Button(window, text="Click here")
button3.bind("<Button-1>", hi)  # Corrected the typo in Button-1
button3.grid(column=1, row=10)

# Bind Mouse Button Clicks to the Window
window.bind("<Button-1>", left_clicked)   # Left click
window.bind("<Button-2>", middle_clicked)  # Middle click (may not work on all OS)
window.bind("<Button-3>", right_clicked)  # Right click

# Run the main event loop
window.mainloop()

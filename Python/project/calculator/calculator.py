from tkinter import *
import math

root = Tk()
root.title("Scientific Calculator")
root.geometry("420x460")

# Entry Box
Entry_box = Entry(root, width=35, borderwidth=5, font=("Arial", 14))
Entry_box.grid(row=0, column=0, columnspan=5, ipady=20, padx=10, pady=10)

# Functions
def button_click(value):
    # Append numbers or operators to the entry box
    current = Entry_box.get()
    Entry_box.delete(0, END)
    Entry_box.insert(0, current + str(value))

def button_clear():
    # Clear the entry box
    Entry_box.delete(0, END)

def button_equal():
    try:
        # Evaluate the expression in the entry box
        result = eval(Entry_box.get().replace("x", "*").replace("÷", "/"))
        Entry_box.delete(0, END)
        Entry_box.insert(0, result)
    except Exception:
        Entry_box.delete(0, END)
        Entry_box.insert(0, "Error")

def button_square():
    try:
        num = float(Entry_box.get())
        Entry_box.delete(0, END)
        Entry_box.insert(0, num ** 2)
    except:
        Entry_box.insert(0, "Error")

def button_sqrt():
    try:
        num = float(Entry_box.get())
        Entry_box.delete(0, END)
        Entry_box.insert(0, math.sqrt(num))
    except:
        Entry_box.insert(0, "Error")

def button_sin():
    try:
        num = float(Entry_box.get())
        Entry_box.delete(0, END)
        Entry_box.insert(0, math.sin(math.radians(num)))
    except:
        Entry_box.insert(0, "Error")

def button_cos():
    try:
        num = float(Entry_box.get())
        Entry_box.delete(0, END)
        Entry_box.insert(0, math.cos(math.radians(num)))
    except:
        Entry_box.insert(0, "Error")

def button_tan():
    try:
        num = float(Entry_box.get())
        Entry_box.delete(0, END)
        Entry_box.insert(0, math.tan(math.radians(num)))
    except:
        Entry_box.insert(0, "Error")

def button_pi():
    Entry_box.insert(END, str(math.pi))

def button_e():
    Entry_box.insert(END, str(math.e))

# Buttons
button1 = Button(root, text="1", padx=20, pady=15, command=lambda: button_click(1))
button2 = Button(root, text="2", padx=20, pady=15, command=lambda: button_click(2))
button3 = Button(root, text="3", padx=20, pady=15, command=lambda: button_click(3))
button4 = Button(root, text="4", padx=20, pady=15, command=lambda: button_click(4))
button5 = Button(root, text="5", padx=20, pady=15, command=lambda: button_click(5))
button6 = Button(root, text="6", padx=20, pady=15, command=lambda: button_click(6))
button7 = Button(root, text="7", padx=20, pady=15, command=lambda: button_click(7))
button8 = Button(root, text="8", padx=20, pady=15, command=lambda: button_click(8))
button9 = Button(root, text="9", padx=20, pady=15, command=lambda: button_click(9))
button0 = Button(root, text="0", padx=20, pady=15, command=lambda: button_click(0))

button_add = Button(root, text="+", padx=20, pady=15, command=lambda: button_click("+"))
button_sub = Button(root, text="-", padx=20, pady=15, command=lambda: button_click("-"))
button_mul = Button(root, text="x", padx=20, pady=15, command=lambda: button_click("x"))
button_div = Button(root, text="÷", padx=20, pady=15, command=lambda: button_click("÷"))

button_equal = Button(root, text="=", padx=20, pady=15, command=button_equal)
button_clear = Button(root, text="C", padx=20, pady=15, command=button_clear)

button_square = Button(root, text="x²", padx=20, pady=15, command=button_square)
button_sqrt = Button(root, text="√x", padx=20, pady=15, command=button_sqrt)
button_sin = Button(root, text="sin", padx=20, pady=15, command=button_sin)
button_cos = Button(root, text="cos", padx=20, pady=15, command=button_cos)
button_tan = Button(root, text="tan", padx=20, pady=15, command=button_tan)
button_pi = Button(root, text="π", padx=20, pady=15, command=button_pi)
button_e = Button(root, text="e", padx=20, pady=15, command=button_e)

# Layout Buttons
button7.grid(row=1, column=0)
button8.grid(row=1, column=1)
button9.grid(row=1, column=2)
button_add.grid(row=1, column=3)

button4.grid(row=2, column=0)
button5.grid(row=2, column=1)
button6.grid(row=2, column=2)
button_sub.grid(row=2, column=3)

button1.grid(row=3, column=0)
button2.grid(row=3, column=1)
button3.grid(row=3, column=2)
button_mul.grid(row=3, column=3)

button0.grid(row=4, column=0)
button_clear.grid(row=4, column=1)
button_equal.grid(row=4, column=2)
button_div.grid(row=4, column=3)

button_square.grid(row=5, column=0)
button_sqrt.grid(row=5, column=1)
button_sin.grid(row=5, column=2)
button_cos.grid(row=5, column=3)

button_tan.grid(row=6, column=0)
button_pi.grid(row=6, column=1)
button_e.grid(row=6, column=2)

root.mainloop()

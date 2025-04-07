from tkinter import *
from PIL import ImageTk,Image

root = Tk()
root.geometry("360x300")
root.title("Learn Tkinter with me")
icon = PhotoImage(file="Address-book.png")  
root.iconphoto(False, icon)

myLabel1 = Label(root, text="Hello World").pack()
button_quit = Button(root, text="Exit", command=root.quit).pack()

my_img = ImageTk.PhotoImage(Image.open("Address-book.png"))
my_label = Label(image=my_img)
my_label.pack()

root.mainloop()
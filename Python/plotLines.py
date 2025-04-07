import matplotlib.pyplot as plt

# Data for the line plot
x = [1, 2, 3, 4, 5]  # x-axis data
y = [2, 4, 6, 8, 10]  # y-axis data

# Create the line plot
plt.plot(x, y, color='blue', linestyle='-', marker='o', label='y = 2x')

# Add title and labels
plt.title("Line Plot Example")
plt.xlabel("X-axis")
plt.ylabel("Y-axis")

# Show legend
plt.legend()

# Display the plot
plt.show()

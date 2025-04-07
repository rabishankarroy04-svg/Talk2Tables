import matplotlib.pyplot as plt
import numpy as np

# Generate random data for scatter plot
x = np.random.rand(50)  # 50 random points for x-axis
y = np.random.rand(50)  # 50 random points for y-axis

# Create scatter plot
plt.scatter(x, y, color='blue', marker='o')

# Add title and labels
plt.title("Scatter Plot of Random Points")
plt.xlabel("X-axis")
plt.ylabel("Y-axis")

# Show the plot
plt.show()

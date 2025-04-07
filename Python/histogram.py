import matplotlib.pyplot as plt
import numpy as np

# Generate random data (e.g., 1000 data points from a normal distribution)
data = np.random.randn(1000)

# Create the histogram
plt.hist(data, bins=30, color='blue', edgecolor='black')

# Add title and labels
plt.title("Histogram of Random Data")
plt.xlabel("Value")
plt.ylabel("Frequency")

# Display the plot
plt.show()

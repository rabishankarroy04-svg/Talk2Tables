import matplotlib.pyplot as plt

# Data for the pie chart
labels = ['A', 'B', 'C', 'D']
sizes = [25, 35, 20, 20]  # Corresponding percentages
colors = ['gold', 'yellowgreen', 'lightcoral', 'lightskyblue']

# Plot the pie chart
plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)

# Equal aspect ratio ensures that pie is drawn as a circle.
plt.axis('equal')

# Add title
plt.title("Pie Chart Example")

# Display the plot
plt.show()

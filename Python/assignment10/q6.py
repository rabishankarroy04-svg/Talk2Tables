import random

# Initialize a dictionary to store frequency counts for each face of the die
frequency = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}

# Roll the die 10,000 times
for _ in range(10000):
    roll = random.randint(1, 6)  # Generate a random integer between 1 and 6 (inclusive)
    frequency[roll] += 1

# Print the frequency of each face
for face, count in frequency.items():
    print(f"Face {face}: {count} times")

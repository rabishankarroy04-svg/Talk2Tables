today="sunday"
if today=="sunday" or today=="saturday":
   print("It's a weekend.")

today="monday"
if today=="saturday" or today=="sunday":
   print("It's a weekend.")
else:
      print("It's a week day.")

today="tuesday"
if today=="saturday" or today=="sunday":
   print("It's a weekend.")
elif today=="monday" or today=="friday":
   print("Work extra 2 hours.")
else:
   print("Normal work hours.")
   
import datetime
todays_date=datetime.date.today()
weekday=todays_date.strftime("%A")

print("Today's Date:",todays_date)
print("Day of the Week:",weekday)
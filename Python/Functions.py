#In-build Functions
#int,str,bool

#Module Functions
import math
print(dir(math))

from math import sqrt
print(sqrt(9))

from math import * 
print(sqrt(9))          # "*" means all

#User-defined Functions
# def function_name(parameters):
#     //Do something
def sum(first,second):
    print(first+second)

print(sum(9,2))

def sum(first,second=5):
    print(first+second)

print(sum(9))

def is_leap(year):
    leap = False
    if year/400==0 and year/100!=0:
        elif year/4==0:
            leap=True
    return leap

year = int(input())
print(is_leap(year))
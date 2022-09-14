import numpy as np
import random
import json

class PC_Build:
    with open("Data.json", 'r') as file:
        parts_data = json.load(file)
    file.close()
    
    def Calculate_Fitness(self, builds):
        
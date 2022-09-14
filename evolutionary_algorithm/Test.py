import numpy as np
import random
import json

class PC_Build:
    with open("Data.json", 'r') as file:
        parts_data = json.load(file)
    file.close()
    
    def Calculate_Fitness(self, builds):
        fitness_score_list = []
        for build in builds:
            fitness_score = self.parts_data['cpu'][build[0]]['benchmark'] + self.parts_data['gpu'][build[1]]['benchmark']
            fitness_score_list.append(fitness_score)
        return fitness_score_list
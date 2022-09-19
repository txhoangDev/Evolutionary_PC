import numpy as np
import random
import json

class PC_Build:
    
    with open("Data.json", 'r') as file:
        parts_data = json.load(file)
    file.close()
    
    fitness_scores = []
    population = []
    current_parents = []
    children = []
    last_gen_parents = []
    solution = []
    number_of_parents = 0
    
    def __init__(self, num_of_parents, cpu_list, gpu_list):
        random.shuffle(cpu_list)
        random.shuffle(gpu_list)
        ii = 0
        for gpu in gpu_list:
            if ii == len(cpu_list):
                ii = 0
            self.population.append([cpu_list[ii], gpu])
            ii += 1
        self.number_of_parents = num_of_parents
    
    def Calculate_Fitness(self, parents):
        return int(self.parts_data['cpu'][parents[0]]['benchmark'].replace(',', '')) + int(self.parts_data['gpu'][parents[1]]['benchmark'].replace(',', ''))
    
    def Generate_Parents(self):
        for combo in self.population:
            fitness = self.Calculate_Fitness(combo)
            if len(self.current_parents) < self.number_of_parents:
                self.current_parents.append(combo)
            else:
                for ii in range(len(self.current_parents)):
                    if fitness > self.Calculate_Fitness(self.current_parents[ii]):
                        self.current_parents[ii] = combo
    
    def Generate_Children(self):
        self.children = []
        cpus = []
        gpus = []
        for ii in range(len(self.current_parents)):
            cpus.append(self.current_parents[ii][0])
            gpus.append(self.current_parents[ii][1])
        random.shuffle(cpus)
        random.shuffle(gpus)
        self.children = list(zip(cpus, gpus))
        self.last_gen_parents = self.current_parents
        self.current_parents = []
        for ii in range(len(self.children)):
            if self.children[ii] not in self.last_gen_parents and \
               self.Calculate_Fitness(self.children[ii]) > self.Calculate_Fitness(self.solution):
                    self.solution = self.children[ii]
                
    def run(self, num_of_generations):
        for ii in range(num_of_generations):
            self.Generate_Parents()
            self.Generate_Children()
        return self.solution
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
    
    def __init__(self, num_of_parents):
        cpus = list(self.parts_data['cpu'].keys())
        random.shuffle(cpus)
        gpus = list(self.parts_data['gpu'].keys())
        random.shuffle(gpus)
        self.population = list(zip(cpus, gpus))
        self.number_of_parents = num_of_parents
    
    def Calculate_Fitness(self, parents):
        return int(self.parts_data['cpu'][parents[0]]['benchmark'].replace(',', '')) + int(self.parts_data['gpu'][parents[1]]['benchmark'].replace(',', ''))
    
    def Generate_Parents(self):
        for ii in range(len(self.population)):
            cur_parents = self.population[random.randint(0, len(self.population)-1)]
            while(cur_parents in self.last_gen_parents):
                cur_parents = self.population[random.randint(0, len(self.population)-1)]
            if len(self.current_parents) == 0:
                self.current_parents.append(cur_parents)
                self.solution = (cur_parents)
            else:
                for jj in range(len(self.current_parents)):
                    if self.Calculate_Fitness(self.current_parents[jj]) < self.Calculate_Fitness(cur_parents):
                        if len(self.current_parents) < self.number_of_parents:
                            self.current_parents.append(cur_parents)
                        else:
                            self.current_parents[jj] = cur_parents
                        if self.Calculate_Fitness(self.solution) < self.Calculate_Fitness(cur_parents):
                            self.solution = (cur_parents)
    
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
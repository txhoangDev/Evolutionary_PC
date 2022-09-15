import numpy as np
import random
import json

class PC_Build:
    with open("Data.json", 'r') as file:
        parts_data = json.load(file)
    file.close()
    
    fitness_scores = []
    build_fitness_map = {}
    
    def Calculate_Fitness(self, builds):
        for build in builds:
            fitness_score = self.parts_data['cpu'][build[0]]['benchmark'] + self.parts_data['gpu'][build[1]]['benchmark']
            self.fitness_scores.append(fitness_score)
    
    def Get_Parents(self, builds, fitness_scores):
        for ii in range(len(builds)):
            self.build_fitness_map[fitness_scores[ii]] = builds[ii]
        fitness_scores.sort(reverse=True)
        return self.build_fitness_map[fitness_scores[0]], self.build_fitness_map[fitness_scores[1]]
    
    def Generate_Children(self, parents, builds):
        cpus = [parents[0][0], parents[1][0]]
        gpus = [parents[0][1], parents[1][1]]
        children = list(zip(cpus, gpus))
        child_score = self.Calculate_Fitness(children)
        self.fitness_scores.sort()
        for score in range(len(children)):
            if self.current_fitness_scores[0] < score:
                self.build_fitness_map.pop(self.current_fitness_scores[0])
                self.current_fitness_scores[0] = child_score[score]
                self.build_fitness_map.pop[self.current_fitness_scores[0]] = children[score]
                self.current_fitness_scores.sort()
                
    def run(self, builds, num_of_generations):
        for ii in range(num_of_generations):
            self.Calculate_Fitness(builds)
            parents = self.Generate_Children(builds, self.fitness_scores)
            self.Generate_Children(parents, builds)
        self.fitness_scores.sort(reverse=True)
        return self.build_fitness_map[self.fitness_scores[0]]
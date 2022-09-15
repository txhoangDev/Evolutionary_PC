# imports
import json
from datetime import date
# from Data_Scraper.scraper import Scraper
from evolutionary_algorithm.Test import PC_Build
import pygad
import numpy

"""
Some pcpartpicker supported parts:
    CPU = 'cpu'    
        cooler = 'cpu-cooler'
    motherboard = 'motherboard'
    GPU = 'video-card'
    case = 'case'
    RAM = 'memory'
    PSU = 'power-supply'
    SSD = 'internal-hard-drive'
    HD = 'external-hard-drive'
"""

# initialize number of combinations
with open("Data.json", "r") as file:
    parts_data = json.load(file)
file.close()

def calculate_fitness(solution, solution_index):
    fitness_score = parts_data['cpu'][solution[solution_index][0]]+ parts_data['gpu'][solution[solution_index][1]]
    return fitness_score

if __name__ == "__main__":
    # gets the list of available CPUs
    cpu_list = parts_data['cpu'].keys()
    # gets the list of available GPUs
    gpu_list = parts_data['gpu'].keys()
    # builds a set of combinations of both
    builds = list(zip(cpu_list, gpu_list))
    
    temp = PC_Build()
    
    temp.run(builds, 50)

    # num_gen = 100
    # num_parents = 10
    # sol_per_pop = 20
    # num_genes = 2
    
    # last_fiteness = 0
    
    # ga_instance = pygad.GA(num_generations=num_gen,
    #                        num_parents_mating=num_parents,
    #                        initial_population=builds,
    #                        sol_per_pop=sol_per_pop,
    #                        num_genes = num_genes,
    #                        crossover_type="single_point",
    #                         fitness_func=calculate_fitness)
    
    # ga_instance.run()
    
    # ga_instance.plot_fitness()
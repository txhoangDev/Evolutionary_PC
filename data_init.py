# imports
import json
from datetime import date
from Data_Scraper.scraper import Scraper
from evolutionary_algorithm.Test import PC_Build

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

if __name__ == "__main__":
    # initialize number of combinations
    with open("Data.json", "r") as file:
        parts_data = json.load(file)
    file.close()
    # gets the list of available CPUs
    cpu_list = parts_data['cpu'].keys()
    # gets the list of available GPUs
    gpu_list = parts_data['gpu'].keys()
    # builds a set of combinations of both
    builds = list(zip(cpu_list, gpu_list))
    
    new_build = PC_Build()
    print(new_build.Calculate_Fitness(builds))
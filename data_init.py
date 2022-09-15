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

if __name__ == "__main__":
    temp = PC_Build(num_of_parents=5)
    print(temp.run(num_of_generations=5200))
    
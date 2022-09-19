# imports
import json
from datetime import date
from Data_Scraper.scraper import Scraper
from evolutionary_algorithm.Test import PC_Build
from requests import get
from bs4 import BeautifulSoup as bs
import re

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
    
    scrape = Scraper()
    
    cpus = scrape.scrape_cpu()
    gpu = scrape.scrape_gpu()
    
    # with open("Data.json", "r") as file:
    #     parts_data = json.load(file)
    # file.close()
    
    # parts_data['cpu'] = cpus
    # parts_data['gpu'] = gpu
    
    # with open("Data.json", 'w') as file:
    #     temp = json.dumps(parts_data, indent=4)
    #     file.write(temp)
    # file.close()
    
    # cpu_list = list(parts_data['cpu'].keys())
    # gpu_list = list(parts_data['gpu'].keys())
    
    # temp = PC_Build(num_of_parents=5, cpu_list=cpu_list, gpu_list=gpu_list)
    # print(temp.run(num_of_generations=6000))
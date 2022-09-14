# imports
import re
import json
from datetime import date
import itertools
import os
from Data_Scraper import scraper

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
    print("hi")
    # temp = Scraper()
    # print(temp.scrape_cpu())
    # initialize number of combinations
    # with open("Data.json", "r") as file:
    #     parts_data = json.load(file)
    # file.close()
    # cpu_list = get_parts_name(parts_data['cpu'])[:10]
    # gpu_list = get_parts_name(parts_data['video-card'])[:10]
    # builds = list(zip(cpu_list, gpu_list))
# imports
import json
from datetime import date
from Data_Scraper.scraper import Scraper
from evolutionary_algorithm.Evolutionary_Algorithm import PC_Build

if __name__ == "__main__":
    
    with open('Data.json', 'r') as file:
        parts_data = json.load(file)
    file.close()
    
    s = Scraper()
    
    
    # temp = PC_Build(num_of_parents=5)
    # print(temp.run(num_of_generations=300))
    
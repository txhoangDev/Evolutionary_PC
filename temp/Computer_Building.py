# imports
import json
from datetime import datetime
from Data_Scraper.scraper import Scraper
from evolutionary_algorithm.Evolutionary_Algorithm import PC_Build

def update_json(parts):
    scraper = Scraper()
    cpus = scraper.scrape_cpu()
    gpus = scraper.scrape_gpu()
    ram = scraper.scrape_ram()
    parts['cpu'] = cpus
    parts['gpu'] = gpus
    parts['ram'] = ram
    with open('Data.json', 'w') as file:
        json_string = json.dumps(parts, indent=4)
        file.write(json_string)
    file.close()
    
def run_evolution(budget, cpu_type, gpu_type, cpu_budget, gpu_budget, ram_budget):
    temp = PC_Build(num_of_parents=10, budget=budget, cpu_type=cpu_type, gpu_type=gpu_type, cpu_budget=cpu_budget, gpu_budget=gpu_budget, ram_budget=ram_budget)
    temp.Generate_Parents()
    return temp.run(num_of_generations=500)
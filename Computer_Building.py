# imports
import json
from datetime import datetime
from Data_Scraper.scraper import Scraper
from evolutionary_algorithm.Evolutionary_Algorithm import PC_Build
from pcpartpicker import API

def update_json(parts):
    
    part_picker_api = API()
    scraper = Scraper()
    cpus = scraper.scrape_cpu()
    gpus = scraper.scrape_gpu()
    ram = scraper.scrape_ram()
    # cases = part_picker_api.retrieve('case')
    # for case in cases['case']:
    #     if case.price.__str__() != 'US$0.00':
    #         parts['case'] = {case.brand + ' ' + case.model: 
    #                             {'price': case.price.__str__().replace('US$', '')}}
    # cooler = part_picker_api.retrieve('cpu-cooler')
    # storage = part_picker_api.retrieve('internal-hard-drive')
    # motherboards = part_picker_api.retrieve('motherboard')
    # print(motherboards)
    parts['cpu'] = cpus
    parts['gpu'] = gpus
    parts['ram'] = ram
    with open('Data.json', 'w') as file:
        json_string = json.dumps(parts)
        file.write(json_string)
    file.close()

if __name__ == "__main__":
    s = Scraper()
    with open('Data.json', 'r') as file:
        parts = json.load(file)
    file.close()
    date1 = datetime.strptime(parts['Last Update'], "%Y-%m-%d")
    today = datetime.today()

    change = today - date1
    
    if change.days > 7:
        update_json(parts)
    
    # temp = PC_Build(num_of_parents=5)
    # print(temp.run(num_of_generations=30))
    
# imports
from turtle import hideturtle
from pcpartpicker import API
from requests import get
import re
import json
from bs4 import BeautifulSoup as bs
from datetime import date

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

def get_cpu_price(item_name):
    """
    Gets the ASIN of each product and looks for the price of the product
    and returns the price of the product
    
    Args:
        item_name (string): name of the item from PC Part Picker
    """
    # replaces item name to fit the amazon url standard
    item = re.sub(r'[\s]', '+', item_name)
    
    # initialize the amazon search url
    search_url = 'https://www.cpubenchmark.net/cpu.php?cpu=' + item
    
    # gets a response from the web browser
    result = get(search_url)
    
    # parses the response into a json/dict
    formatted_result = bs(result.content, 'html.parser')

    price = formatted_result.find_all('a', attrs={'href': '#history'})
    
    if len(price) == 0:
        return 'NA'
    else:
        for p in price:
            return p.text

if __name__ == "__main__":
    # initalizes an API instance and sets region to US
    with open("Data.json", 'r') as file:
        data = json.load(file)
    file.close()
    # with open("Data.json", 'w') as json_file:
    #     json.write()
    #     # y, m, d = [int(x) for x in data['Last_Update'].split("-")]
    #     # last_update = date(y, m, d)
    # json_file.close()
    api_instance = API()
    parts_data = api_instance.retrieve_all()
    for part in parts_data:
        if part == 'cpu':
            for info in parts_data[part]:
                data[part].append({"name": info.brand + ' ' + info.model, "price": info.price.__str__(), "benchmark": 0})
        elif part == 'video-card':
            for info in parts_data[part]:
                data[part].append({"name": info.brand + ' ' + info.model, "price": info.price.__str__(), "benchmark": 0})
    info = json.dumps(data, indent=4)
    with open("Data.json", "w") as file:
        file.write(info)
    file.close()
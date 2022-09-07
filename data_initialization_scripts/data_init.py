# imports
from pcpartpicker import API
from requests_html import HTMLSession
import json
import re

"""
Some pcpartpicker supported parts:
    CPU = 'cpu'    
        cooler = 'cpu-cooler'
    motherboard = 'motherboard'
    GPU = 'video-card'
    fans = 'case-fans'
    case = 'case'
    RAM = 'memory'
    PSU = 'power-supply'
    SSD = 'internal-hard-drive'
    HD = 'external-hard-drive'
"""

def amazon_price_extractor(item_name):
    """
    Gets the ASIN of each product and looks for the price of the product
    
    Args:
        item_name (string): name of the item from PC Part Picker
    """
    
    # replaces item name to fit the amazon url standard
    item = re.sub(r'[\s|-]', '+', item_name)
    
    # initialize the amazon search url
    search_url = 'https://www.amazon.com/s?k=' + item
    
    # starts a web browser session to get HTML from url
    web_session = HTMLSession()
    web_result = web_session.get(search_url)
    # ensures that a response will be given before moving on
    web_result.html.render(sleep=1)
    
    # gets data from the results from web page for ASIN
    asin_result = web_result.html.find('div[data-asin]')
    
    # finds the first non-empty ASIN and breaks out of the loop
    for asin in asin_result:
        if(asin.attrs['data-asin'] != ""):
            product_asin = asin.attrs['data-asin']
            break
    
    # Makes the product name fit the url standard
    product_name = re.sub(r'\+', '-', item)
    product_url = 'https://www.amazon.com/' + product_name + '/dp/' + product_asin

    # gets the product page information 
    product_result = web_session.get(product_url)
    product_result.html.render(sleep=1)
    
    # finds the price from the HTML
    # this would be the dollars of the price
    product_info = product_result.html.find('span[class="a-price-whole"]')
    # this would the cents of the price
    product_info2 = product_result.html.find('span[class="a-price-fraction"]')
    
    #gets price and places in variable
    for product in product_info:
        price_whole = product.text
        break;
    for product in product_info2:
        price_decimal = product.text
        break;
    
    price = price_whole + '.' + price_decimal

# retrieving cpu data
def retrieve_cpu_data(api_instance):
    """
    Gets CPU data from PCPartPickerAPI
    
    Args:
        api_instance (PCPartPickerAPI Instance): passes the instance
                                                 initialized in main
    """
    
    # gets the data from the API and turns it into a string (JSON)
    cpu_data = api_instance.retrieve("cpu").to_json()
    # Turns the JSON into a dictionary for data access
    # Dictionary looks like this:
    # {'cpu':[{'brand': name, 
    #          'model': name, 
    #          'cores': num}]}
    cpu_info_dict = json.loads(cpu_data)
    
def retrieve_gpu_data(api_instance):
    """
    Gets the GPU data from PCPartPickerAPI

    Args:
        api_instance (PcPartPickerAPI Instance): passes the instance
                                                 initialized in main
    """
    
    # gets the data from the API and turns it into a JSON String
    gpu_data = api_instance.retrieve("video-card").to_json()
    # turns the JSON into a dictionary for access later
    # Dictionary looks like this:
    # {'video-card':[{'brand': name,
    #                 'model': name,
    #                 etc.}]}
    gpu_info_dict = json.loads(gpu_data)


if __name__ == "__main__":
    # initalizes an API instance and sets region to US
    api_instance = API("us")
    retrieve_cpu_data(api_instance)
    retrieve_gpu_data(api_instance)
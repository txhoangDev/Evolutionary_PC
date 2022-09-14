import json
from requests import get
from bs4 import BeautifulSoup as bs
from pcpartpicker import API
from datetime import date

class Scraper:
    
    with open("Data.json", "r") as file:
        parts_data = json.load(file)
    file.close()
    
    cpu_page_response = get("https://www.cpubenchmark.net/desktop.html#cpumark")
    gpu_page_response = get("https://www.videocardbenchmark.net/directCompute.html")
    ram_page_response = get("https://www.memorybenchmark.net/ram_list-ddr4.php")
    
    def scrape_cpu(self):
        
        cpu_names = []
        
        cpu_html = bs(self.cpu_page_response.content, 'html.parser')

        cpu_names_tag = cpu_html.find_all('span', attrs={'class': 'prdname'})
        
        for cpu in cpu_names_tag:
            cpu_names.append(cpu.text)
            
        return cpu_names
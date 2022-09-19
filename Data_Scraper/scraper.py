import json
from operator import attrgetter
from requests import get
from bs4 import BeautifulSoup as bs
from pcpartpicker import API
from datetime import date
import re

class Scraper:
    
    with open("Data.json", "r") as file:
        parts_data = json.load(file)
    file.close()
    
    cpu_page_response = get("https://www.cpubenchmark.net/desktop.html#cpumark")
    gpu_page_response = get("https://www.videocardbenchmark.net/directCompute.html")
    ram_intel_response = get("https://www.memorybenchmark.net/read_uncached_ddr4_intel.html")
    ram_amd_response = get("https://www.memorybenchmark.net/read_uncached_ddr4_amd.html")
    
    def scrape_cpu(self):
        
        # initalizing cpu dictionary:
        # cpu_name:{
        #     "price": price,
        #     "benchmark": score
        # }
        cpu_info = {}
        
        # get cpu page and turn into html
        cpu_html = bs(self.cpu_page_response.content, 'html.parser')

        # get data from html page containing name, price, benchmark
        cpu_names_tag = cpu_html.find_all('span', attrs={'class': 'prdname'})
        cpu_price_tag = cpu_html.find_all('span', attrs={'class': 'price-neww'})
        cpu_benchmark_tag = cpu_html.find_all('span', attrs={'class': 'count'})
        
        
        # places the attributes into the dictionary according to format
        for ii in range(len(cpu_names_tag)):
            # if price doesn't exists then we move on cause we can't use it
            if cpu_price_tag[ii].text == 'NA' or cpu_benchmark_tag[ii].text == 'NA':
                continue
            # removes the '*' from price
            cpu_page_response = get("https://www.cpubenchmark.net/cpu.php?cpu=" + cpu_names_tag[ii].text.replace(' ', '+'))
            cpu_html = bs(cpu_page_response.content, 'html.parser')
            description_tag = cpu_html.find_all('div', attrs={'class':'left-desc-cpu'})
            if 'Class: Desktop' in description_tag[0].text:
                price = cpu_price_tag[ii].text.replace('$', '').replace(',', '').replace('*', '')
                cpu_info[cpu_names_tag[ii].text] = {"price": price,
                                                    "benchmark": cpu_benchmark_tag[ii].text.replace(',', '')}
        return cpu_info
    
    def scrape_gpu(self):
        
        # initalizing cpu dictionary:
        # gpu_name:{
        #     "price": price,
        #     "benchmark": score
        # }
        gpu_info = {}
        
        # get gpu page and turn into html
        gpu_html = bs(self.gpu_page_response.content, 'html.parser')

        # get data from html page containing name, price, benchmark
        gpu_chart_tag = gpu_html.find_all('div', attrs={'id': 'mark'})
        
        for tag in gpu_chart_tag:
            gpu_names = tag.find_all('span', attrs={'class': 'prdname'})
            gpu_prices = tag.find_all('span', attrs={'class': 'price-neww'})
            gpu_benchmark = tag.find_all('span', attrs={'class': 'count'})
        
        for ii in range(len(gpu_names)):
            # if price doesn't exists then we move on cause we can't use it
            if gpu_prices[ii].text == 'NA' or gpu_benchmark[ii].text == 'NA':
                continue
            # removes the '*' from price
            gpu_page_response = get("https://www.videocardbenchmark.net/gpu.php?gpu=" + gpu_names[ii].text.replace(' ', '+'))
            gpu_html = bs(gpu_page_response.content, 'html.parser')
            description_tag = gpu_html.find_all('div', attrs={'class':'desc-foot'})
            if len(description_tag) > 0:
                if 'Videocard Category: Desktop' in description_tag[0].text:
                    price = gpu_prices[ii].text.replace('$', '').replace(',', '').replace('*', '')
                    gpu_info[gpu_names[ii].text] = {"price": price,
                                                    "benchmark": gpu_benchmark[ii].text.replace(',', '')}
        return gpu_info
    
    def get_ram_benchmark(self, ram_name):
        benchmark_response = get("https://www.memorybenchmark.net/ram.php?ram=" + ram_name)
        
        benchmark_html = bs(benchmark_response, 'html.parser')
        
        ram_benchmark_tag = benchmark_html.find_all('span', attrs={'style': 'font-family: Arial, Helvetica, sans-serif;font-size: 44px;	font-weight: bold; color: #F48A18;'})
        
        return ram_benchmark_tag[0]
    
    def scrape_ram(self):
        
        # initalizing cpu dictionary:
        # ram_name:{
        #     "price": price,
        #     "benchmark": score
        # }
        ram_info = {}
        
        intel_html = bs(self.ram_intel_response, 'html.parser')
        
        # get data from html page containing name, price, benchmark
        # intel_name_tag = intel_html.find_all('span', attrs={'class': 'prdname'})
        # intel_price_tag = intel_html.find_all('span', attrs={'class': 'price-neww'})
        
        # places the attributes into the dictionary according to format
        # for ii in range(len(intel_name_tag)):
        #     benchmark = self.get_ram_benchmark(intel_name_tag[ii].text.replace(' ', '+'))
        #     # if price doesn't exists then we move on cause we can't use it
        #     if intel_price_tag[ii].text == 'NA':
        #         continue
        #     # removes the '*' from price
        #     elif re.match(r'\$[\d]*.[\d]*\*', intel_price_tag[ii].text):
        #         price = intel_price_tag[ii].text.replace('*', '')
        #         ram_info[intel_name_tag[ii].text] = {"price": price,
        #                                             "benchmark": benchmark}                
        #     else:
        #         ram_info[intel_name_tag[ii].text] = {"price": intel_price_tag[ii].text,
        #                                             "benchmark": benchmark}
        
        # amd_html = bs(self.ram_amd_response, 'html.parser')
        
        # # get data from html page containing name, price, benchmark
        # amd_name_tag = amd_html.find_all('span', attrs={'class': 'prdname'})
        # amd_price_tag = amd_html.find_all('span', attrs={'class': 'price-neww'})
        
        # # places the attributes into the dictionary according to format
        # for ii in range(len(amd_name_tag)):
        #     benchmark = self.get_ram_benchmark(amd_name_tag[ii].text.replace(' ', '+'))
        #     # if price doesn't exists then we move on cause we can't use it
        #     if amd_price_tag[ii].text == 'NA':
        #         continue
        #     # removes the '*' from price
        #     elif re.match(r'\$[\d]*.[\d]*\*', amd_price_tag[ii].text):
        #         print("hi")
        #         price = amd_price_tag[ii].text.replace('*', '')
        #         ram_info[amd_name_tag[ii].text] = {"price": price,
        #                                             "benchmark": benchmark}                
        #     else:
        #         ram_info[amd_name_tag[ii].text] = {"price": amd_price_tag[ii].text,
        #                                             "benchmark": benchmark}
                
        return ram_info
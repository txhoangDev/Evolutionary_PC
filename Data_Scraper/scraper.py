import json
from requests import get
from bs4 import BeautifulSoup as bs

class Scraper:
    
    with open("Data.json", "r") as file:
        parts_data = json.load(file)
    file.close()
    
    cpu_page_response = get("https://www.cpubenchmark.net/desktop.html#cpumark")
    gpu_page_response = get("https://www.videocardbenchmark.net/directCompute.html")
    ram_ddr4_response = get("https://www.memorybenchmark.net/ram_list-ddr4.php")
    ram_ddr5_response = get("https://www.memorybenchmark.net/ram_list.php")
    
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
            if cpu_names_tag[ii].text in list(self.parts_data['cpu'].keys()):
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
            if gpu_names[ii].text in list(self.parts_data['gpu'].keys()):
                price = gpu_prices[ii].text.replace('$', '').replace(',', '').replace('*', '')
                gpu_info[gpu_names[ii].text] = {"price": price,
                                                "benchmark": gpu_benchmark[ii].text.replace(',', '')}
        return gpu_info
    
    def scrape_ram(self):
        
        # initalizing cpu dictionary:
        # ram_name:{
        #     "price": price,
        #     "benchmark": score
        # }
        ram_info = {}
        
        ddr4_html = bs(self.ram_ddr4_response.content, 'html.parser')
        table_tags = ddr4_html.find('table', attrs={'id': 'cputable'})
        
        benchmark_site = 'https://www.memorybenchmark.net/ram.php?ram='
        
        for row in table_tags.tbody.find_all('tr'):
            columns = row.find_all('td')
            if columns != []:
                if columns[4].text != 'NA':
                    price = columns[4].text.replace('$', '').replace('*', '')
                    name = columns[0].text
                    link = columns[0].find('a')['href']
                    benchmark_page = bs(get("https://www.memorybenchmark.net/ram.php?ram=" + str(link)).content, 'html.parser')
                    benchmark = benchmark_page.find('span', attrs={'style': 'font-family: Arial, Helvetica, sans-serif;font-size: 44px;	font-weight: bold; color: #F48A18;'}).text
                    ram_info[name] = {'price': price, 'benchmark': benchmark}
               
        return ram_info
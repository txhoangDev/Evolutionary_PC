from django.core.management.base import BaseCommand
from requests import get
from bs4 import BeautifulSoup as bs
from datetime import date
from evolutionary_builder.models import *

class Command(BaseCommand):
    def handle(self, *args, **options):
        RAM.objects.all().delete()
        ram_ddr4_response = get("https://www.memorybenchmark.net/ram_list-ddr4.php")
        ram_ddr5_response = get("https://www.memorybenchmark.net/ram_list.php")
        ddr4_html = bs(ram_ddr4_response.content, 'html.parser')
        ddr5_html = bs(ram_ddr5_response.content, 'html.parser')
        table_tags = ddr4_html.find('table', attrs={'id': 'cputable'})
        table_tags.append(ddr5_html.find('table', attrs={'id': 'cputable'}))
        
        for row in table_tags.tbody.find_all('tr'):
            columns = row.find_all('td')
            if columns != []:
                if columns[4].text != 'NA':
                    link = columns[0].find('a')['href']
                    benchmark_page = bs(get("https://www.memorybenchmark.net/" + str(link), timeout=None).content, 'html.parser')
                    benchmark = benchmark_page.find('span', attrs={'style': 'font-family: Arial, Helvetica, sans-serif;font-size: 44px;	font-weight: bold; color: #F48A18;'})
                    if benchmark != None:
                        RAM.objects.create(
                            name=columns[0].text,
                            price=float(columns[4].text.replace('$', '').replace('*', '').replace(',', '')),
                            benchmark=benchmark.text,
                            date=date.today()
                        ).save()
        self.stdout.write("ALL RAM RETRIEVED")
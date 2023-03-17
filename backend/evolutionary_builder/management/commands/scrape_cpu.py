from django.core.management.base import BaseCommand
from requests import get
from bs4 import BeautifulSoup as bs
from datetime import date
from evolutionary_builder.models import *

class Command(BaseCommand):
    def handle(self, *args, **options):
        CPU.objects.all().delete()
        cpu_page_response = get("https://www.cpubenchmark.net/desktop.html#cpumark")
        cpu_html = bs(cpu_page_response.content, 'html.parser')
        cpu_names_tag = cpu_html.find('ul', attrs={'class': 'chartlist'}).find_all('span', attrs={'class': 'prdname'})
        cpu_price_tag = cpu_html.find('ul', attrs={'class': 'chartlist'}).find_all('span', attrs={'class': 'price-neww'})
        cpu_benchmark_tag = cpu_html.find('ul', attrs={'class': 'chartlist'}).find_all('span', attrs={'class': 'count'})
        # places the attributes into the dictionary according to format
        for ii in range(len(cpu_names_tag)):
            # if price doesn't exists then we move on cause we can't use it
            if cpu_price_tag[ii].text == 'NA' or cpu_benchmark_tag[ii].text == 'NA':
                continue
            # removes the '*' from price
            CPU.objects.create(
                name=cpu_names_tag[ii].text,
                price=float(cpu_price_tag[ii].text.replace(',', '').replace('*', '').replace('$', '')),
                benchmark=cpu_benchmark_tag[ii].text.replace(',', ''),
                date=date.today()
            ).save()
        self.stdout.write('ALL CPUS RETRIEVED')
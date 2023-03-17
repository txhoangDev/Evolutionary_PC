from django.core.management.base import BaseCommand
from requests import get
from bs4 import BeautifulSoup as bs
from datetime import date
from evolutionary_builder.models import *

class Command(BaseCommand):
    def handle(self, *args, **options):
        GPU.objects.all().delete()
        gpu_page_response = get("https://www.videocardbenchmark.net/directCompute.html")
        gpu_html = bs(gpu_page_response.content, 'html.parser')
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
            GPU.objects.create(
                name=gpu_names[ii].text,
                price=float(gpu_prices[ii].text.replace(',', '').replace('*', '').replace('$', '')),
                benchmark=gpu_benchmark[ii].text.replace(',', ''),
                date=date.today()
            ).save()
        self.stdout.write("ALL GPUS RETRIEVED")
# DEPENDENCIES
1. Python Version: 3.7+
  * Modules:
    * BeautifulSoup
    * Requests

# How it works
## BACKEND
**scrape.py** will run when the information is out of date. This script will webscrape [cpubenchmark.net](https://www.cpubenchmark.net/) for parts information. It will search for the price, benchmark, wattage, and even socket for each part with its corresponding necessary information.

Format of **Data.json**:
`{ 'Last Update': date_of_last_update,
  'cpu': {
     'name_of_cpu': {
           'price': $$, 
           'benchmark': score, 
           'socket': type, 
           'wattage': power
     },
  },
  'gpu': {
     'name_of_gpu': {
           'price': $$, 
           'benchmark': score, 
           'wattage': power
     }
  },
  'ram': {
     'name_of_ram': {
           'price': $$,
           'benchmark': score
     }
  }
}`


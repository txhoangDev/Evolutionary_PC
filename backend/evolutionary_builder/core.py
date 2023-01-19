import json

parts_data = {}
with open("Data.json", 'r') as file:
    parts_data = json.load(file)
file.close()

def get_cpu_price(cpu):
    return parts_data['cpu'][cpu]['price']

def get_gpu_price(gpu):
    return parts_data['gpu'][gpu]['price']

def get_ram_price(ram):
    return parts_data['ram'][ram]['price']
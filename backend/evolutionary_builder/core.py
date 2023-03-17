from .models import *
from .models import CPU, GPU, RAM
from .serializers import *
import random
import itertools

def initialize_parts(budget, cpu_type, gpu_type, cpu_budget, gpu_budget, ram_budget):
    cpu_budget = float(cpu_budget)
    gpu_budget = float(gpu_budget)
    ram_budget = float(ram_budget)
    budget = float(budget)
    if cpu_budget == 0.0:
        cpu_budget = budget * 0.25
    if gpu_budget == 0.0:
        gpu_budget = budget * 0.35
    if ram_budget == 0.0:
        ram_budget = budget * 0.1
    total_budget = cpu_budget + gpu_budget + ram_budget
    ratio = (0.7 * float(budget)) / total_budget
    if cpu_budget == float(budget) * 0.25:
        cpu_budget = cpu_budget * ratio
    if gpu_budget == float(budget) * 0.35:
        gpu_budget = gpu_budget * ratio
    if ram_budget == float(budget) * 0.1:
        ram_budget = ram_budget * ratio
    cpus = CPUSerializer(CPU.objects.all(), many=True).data
    gpus = GPUSerializer(GPU.objects.all(), many=True).data
    rams = RAMSerializer(RAM.objects.all(), many=True).data
    cpus = list(cpu for cpu in cpus if float(cpu['price']) <= cpu_budget)
    if cpu_type != 'None':
        cpus = list(cpu for cpu in cpus if cpu_type in cpu['name'])
    random.shuffle(cpus)
    gpus = list(gpu for gpu in gpus if float(gpu['price']) <= gpu_budget)
    if gpu_type != 'None':
        gpus = list(gpu for gpu in gpus if gpu_type in gpu['name'])
    random.shuffle(gpus)
    rams = list(ram for ram in rams if float(ram['price']) <= ram_budget)
    max_list = max(len(cpus), len(gpus), len(rams))
    jj = 0
    kk = 0
    population = []
    if max_list == len(cpus):
        for ii in range(len(cpus)):
            if jj == len(gpus):
                jj = 0
            if kk == len(rams):
                kk = 0
            population.append([cpus[ii], gpus[jj], rams[kk]])
            jj += 1
            kk += 1
    elif max_list == len(gpus):
        for ii in range(len(gpus)):
            if jj == len(cpus):
                jj = 0
            if kk == len(rams):
                kk = 0
            population.append([cpus[jj], gpus[ii], rams[kk]])
            jj += 1
            kk += 1
    else:
        for ii in range(len(rams)):
            if jj == len(cpus):
                jj = 0
            if kk == len(gpus):
                kk = 0
            population.append([cpus[jj], gpus[kk], rams[ii]])
            jj += 1
            kk += 1
    return list(population)

def calculate_fitness(parts):
    return float(parts[0]['benchmark']) + float(parts[1]['benchmark']) + float(parts[2]['benchmark'])

def generate_components(budget, cpu_type, gpu_type, cpu_budget, gpu_budget, ram_budget):
    population = initialize_parts(budget, cpu_type, gpu_type, cpu_budget, gpu_budget, ram_budget)
    solution = []
    parents = []
    for group in population:
        if len(parents) < 10:
            if len(solution) == 0:
                solution = group
            elif calculate_fitness(group) > calculate_fitness(solution):
                solution = group
            parents.append(group)
        else:
            for ii in range(10):
                if parents[ii][0] != group[0] and parents[ii][1] != group[1] and parents[ii][2] != group[2]:
                    if calculate_fitness(parents[ii]) < calculate_fitness(group):
                        parents[ii] = group
                        if calculate_fitness(parents[ii]) > calculate_fitness(solution):
                            solution = parents[ii]
                    break
    for jj in range(1000):
        cpus = []
        gpus = []
        rams = []
        for parent in parents:
            cpus.append(parent[0])
            gpus.append(parent[1])
            rams.append(parent[2])
        children = list(itertools.product(cpus, gpus, rams))
        for child in children:
            if child not in parents:
                for ii in range(len(parents)):
                    if calculate_fitness(child) > calculate_fitness(parents[ii]):
                        list(parents)[ii] = child
                        if calculate_fitness(child) > calculate_fitness(solution):
                            solution = child
                        break
        parent1_ran = random.randint(0, len(parents)-1)
        cpu_ran = random.randint(0, len(population)-1)
        parent2_ran = random.randint(0, len(parents)-1)
        while parent2_ran == parent1_ran:
            parent2_ran = random.randint(0, len(parents)-1)
        while float(parents[parent1_ran][0]['benchmark']) > float(population[cpu_ran][0]['benchmark']):
            cpu_ran = random.randint(0, len(population)-1)
        gpu_ran = random.randint(0, len(population)-1)
        parent3_ran = random.randint(0, len(parents)-1)
        while parent3_ran == parent2_ran or parent3_ran == parent1_ran:
            parent3_ran = random.randint(0, len(parents)-1)
        while float(parents[parent2_ran][1]['benchmark']) > float(population[gpu_ran][1]['benchmark']):
            gpu_ran = random.randint(0, len(population)-1)
        ram_ran = random.randint(0, len(population)-1)
        while float(parents[parent3_ran][2]['benchmark']) > float(population[ram_ran][2]['benchmark']):
            ram_ran = random.randint(0, len(population)-1)
        list(parents)[parent1_ran][0] = population[cpu_ran][0]
        list(parents)[parent2_ran][1] = population[gpu_ran][1]
        list(parents)[parent3_ran][2] = population[ram_ran][2]
    for parent in parents:
        if calculate_fitness(parent) > calculate_fitness(solution):
            solution = parent
    return solution
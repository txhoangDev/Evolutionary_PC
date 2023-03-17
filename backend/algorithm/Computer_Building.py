# imports
from .evolutionary_algorithm.Evolutionary_Algorithm import PC_Build
    
def run_evolution(budget, cpu_type, gpu_type, cpu_budget, gpu_budget, ram_budget):
    temp = PC_Build(num_of_parents=10, budget=float(budget), cpu_type=cpu_type, gpu_type=gpu_type, cpu_budget=float(cpu_budget), gpu_budget=float(gpu_budget), ram_budget=float(ram_budget))
    temp.Generate_Parents()
    return temp.run(num_of_generations=500)
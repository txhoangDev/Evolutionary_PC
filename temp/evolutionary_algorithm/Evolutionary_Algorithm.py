import random
import itertools
import json

class PC_Build:
    
    parts_data = {}
    with open("Data.json", 'r') as file:
        parts_data = json.load(file)
    file.close()
    
    # class variable initializations
    population = []
    parents = []
    children = []
    solution = []
    num_parents = 0
    
    def __init__(self, num_of_parents, budget, cpu_type, gpu_type, cpu_budget, gpu_budget, ram_budget):
        
        """
        
        This is the init function for the class it will make sure all local
        class variables are initalized to 0 or empty lists.
        
        It will create the list of populations with the parts available.
        
        __args__:
        num_of_parents = user input the number of parents the evolution will
                         have
        
        """
        
        # get the list of CPUs and GPUs and randomize them
        if cpu_budget == 0:
            cpu_budget = float(budget) * 0.25
        if gpu_budget == 0:
            gpu_budget = float(budget) * 0.35
        if ram_budget == 0:
            ram_budget = float(budget) * 0.1
        cpus = list(cpu for cpu in self.parts_data['cpu'].keys() if float(self.parts_data['cpu'][cpu]["price"]) <= cpu_budget)
        if cpu_type != "":
            cpus = list(cpu for cpu in cpus if cpu_type in cpu)
        random.shuffle(cpus)
        gpus = list(gpu for gpu in self.parts_data['gpu'].keys() if float(self.parts_data['gpu'][gpu]["price"]) <= gpu_budget)
        if gpu_type != "":
            gpus = list(gpu for gpu in gpus if gpu_type in gpu)
        random.shuffle(gpus)
        rams = list(ram for ram in self.parts_data['ram'].keys() if float(self.parts_data['ram'][ram]["price"]) <= ram_budget)
        
        # find the max length from all of the lists
        max_list = max(len(cpus), len(gpus), len(rams))

        # from the maximum amount of numbers from max function
        # create a permutation of each element in each list
        # this may repeat for the shorter list but will use the
        # larger list elements once
        # this will allow for every available part to be used
        
        # index of smaller list for iteration
        jj = 0
        kk = 0
        if max_list == len(cpus):
            # loops through bigger list
            for ii in range(len(cpus)):
                if jj == len(gpus):
                    jj = 0
                if kk == len(rams):
                    kk = 0
                self.population.append([cpus[ii], gpus[jj], rams[kk]])
                jj += 1
                kk += 1
        elif max_list == len(gpus):
            for ii in range(len(gpus)):
                if jj == len(cpus):
                    jj = 0
                if kk == len(rams):
                    kk = 0
                self.population.append([cpus[jj], gpus[ii], rams[kk]])
                jj += 1
                kk += 1
        else:
            for ii in range(len(rams)):
                if jj == len(cpus):
                    jj = 0
                if kk == len(gpus):
                    kk = 0
                self.population.append([cpus[jj], gpus[kk], rams[ii]])
                jj += 1
                kk += 1
        
        # initialize the passed in param to correct class variable
        self.num_parents = num_of_parents
    
    def Calculate_Fitness(self, parents):
        """
        
        This function is used to calculate the fitness of the parts list.

        Args:
            parents (list): the parts list to be used to calculate the total
                            benchmark of the parts in the list

        Returns:
            int: this will be the variable that holds the overall fitness of
                 parts, aka the benchmark
        """
        return int(self.parts_data['cpu'][parents[0]]['benchmark']) + \
               int(self.parts_data['gpu'][parents[1]]['benchmark']) + \
               int(self.parts_data['ram'][parents[2]]['benchmark'])
    
    def Generate_Parents(self):
        
        """
        
        Using the population generated in __init__, it will generate the
        parents by looking for the best fit parents to create offsprings
        
        """
        
        for group in self.population:
            # adds parents when the list is less than the inputted size
            if len(self.parents) < self.num_parents:
                # initalizes the solution
                if len(self.solution) == 0:
                    self.solution = group
                else:
                    # checks if there is a better fit solution
                    if self.Calculate_Fitness(group) > self.Calculate_Fitness(self.solution):
                        self.solution = group
                self.parents.append(group)
            else:
                # checks if the current grouping is better than what is in 
                # the parents list
                for ii in range(self.num_parents):
                    # checks to make sure no duplicate CPU or GPU is listed for better variety
                    if self.parents[ii][0] != group[0] and self.parents[ii][1] != group[1] and self.parents[ii][2] != group[2]:
                        # only change parents if current group's fitness is higher
                        if self.Calculate_Fitness(self.parents[ii]) < self.Calculate_Fitness(group):
                            self.parents[ii] = group
                            # finds a better fit solution
                            if self.Calculate_Fitness(self.parents[ii]) > self.Calculate_Fitness(self.solution):
                                self.solution = self.parents[ii]
                            break;
    
    def Generate_Children(self):
        
        """
        
        Creates all the possible children from the parents and gets the 
        best fit children to become parents
        
        This will keep the parents that are more fit than the children
        to continue the proceding generations
        
        """
        
        # finds list of CPUs and GPUs from parents
        cpus = []
        gpus = []
        rams = []
        for parent in self.parents:
            cpus.append(parent[0])
            gpus.append(parent[1])
            rams.append(parent[2])
        # gets the combination for offsprings of parents
        self.children = list(itertools.product(cpus, gpus, rams))
        # loops through each child
        for child in self.children:
            # makes sure the child isn't already in the parent
            if list(child) not in self.parents:
                for ii in range(len(self.parents)):
                    # checks if child is more fit than parent if so then switch them
                    if self.Calculate_Fitness(child) > self.Calculate_Fitness(self.parents[ii]):
                        self.parents[ii] = list(child)
                        # finds a better fit solution
                        if self.Calculate_Fitness(child) > self.Calculate_Fitness(self.solution):
                            self.solution = list(child)
                        break;
    
    def Mutate(self):
        
        """
        
        This function changes the genes of 3 random parents/children
        
        """
        
        # initializes the random numbers for indexes of gene pool
        # and parent 
        parent1_ran = random.randint(0, len(self.parents)-1)
        cpu_ran = random.randint(0, len(self.population)-1)
        parent2_ran = random.randint(0, len(self.parents)-1)
        while parent2_ran == parent1_ran:
            parent2_ran = random.randint(0, len(self.parents)-1)
        while int(self.parts_data['cpu'][self.parents[parent1_ran][0]]['benchmark']) > int(self.parts_data['cpu'][self.population[cpu_ran][0]]['benchmark']):
            cpu_ran = random.randint(0, len(self.population)-1)
        gpu_ran = random.randint(0, len(self.population)-1)
        parent3_ran = random.randint(0, len(self.parents)-1)
        while parent3_ran == parent2_ran or parent3_ran == parent1_ran:
            parent3_ran = random.randint(0, len(self.parents)-1)
        while int(self.parts_data['gpu'][self.parents[parent2_ran][1]]['benchmark']) > int(self.parts_data['gpu'][self.population[gpu_ran][1]]['benchmark']):
            gpu_ran = random.randint(0, len(self.population)-1)
        ram_ran = random.randint(0, len(self.population)-1)
        while int(self.parts_data['ram'][self.parents[parent3_ran][2]]['benchmark']) > int(self.parts_data['ram'][self.population[ram_ran][2]]['benchmark']):
            ram_ran = random.randint(0, len(self.population)-1)
        # changes genes of parent/children
        self.parents[parent1_ran][0] = self.population[cpu_ran][0]
        self.parents[parent2_ran][1] = self.population[gpu_ran][1]
        self.parents[parent3_ran][2] = self.population[ram_ran][2]
                
    def run(self, num_of_generations):
        
        """
        
        This function will run the until the number of generations passed
        have been done
        
        Args:
            num_of_generations (int): the number of generations that 
                                      algorithm should go through

        Returns:
            list: it should be the list of the best fit parts
        """
        
        self.Generate_Parents()
        for ii in range(num_of_generations):
            self.Generate_Children()
            self.Mutate()
        for parent in self.parents:
            if self.Calculate_Fitness(parent) > self.Calculate_Fitness(self.solution):
                self.solution = parent
        solution_with_price = {self.solution[0]: self.parts_data['cpu'][self.solution[0]]['price'],
                               self.solution[1]: self.parts_data['gpu'][self.solution[1]]['price'],
                               self.solution[2]: self.parts_data['ram'][self.solution[2]]['price']}
        return solution_with_price
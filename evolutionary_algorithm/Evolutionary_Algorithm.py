import numpy as np
import random
import json
import itertools

class PC_Build:
    
    # this will read in the parts from the json file into a dictionary
    with open("Data.json", 'r') as file:
        parts_data = json.load(file)
    file.close()
    
    # class variable initializations
    population = []
    parents = []
    children = []
    solution = []
    num_parents = 0
    
    def __init__(self, num_of_parents):
        
        """
        
        This is the init function for the class it will make sure all local
        class variables are initalized to 0 or empty lists.
        
        It will create the list of populations with the parts available.
        
        __args__:
        num_of_parents = user input the number of parents the evolution will
                         have
        
        """
        
        # initialize everything to empty or 0
        self.population = []
        self.parents = []
        self.children = []
        self.solution = []
        self.num_parents = 0
        
        # get the list of CPUs and GPUs and randomize them
        cpus = list(self.parts_data['cpu'].keys())
        random.shuffle(cpus)
        gpus = list(self.parts_data['gpu'].keys())
        random.shuffle(gpus)
        
        # find the max length from all of the lists
        max_list = max(len(cpus), len(gpus))

        # from the maximum amount of numbers from max function
        # create a permutation of each element in each list
        # this may repeat for the shorter list but will use the
        # larger list elements once
        # this will allow for every available part to be used
        
        # index of smaller list for iteration
        jj = 0
        if max_list == len(cpus):
            # loops through bigger list
            for ii in range(len(cpus)):
                if jj == len(gpus):
                    jj = 0
                self.population.append([cpus[ii], gpus[jj]])
                jj += 1
        else:
            for ii in range(len(gpus)):
                if jj == len(cpus):
                    jj = 0
                self.population.append([cpus[jj], gpus[ii]])
                jj += 1
        
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
               int(self.parts_data['gpu'][parents[1]]['benchmark'])
    
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
                    if self.parents[ii][0] != group[0] and self.parents[ii][1] != group[1]:
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
        for parent in self.parents:
            cpus.append(parent[0])
            gpus.append(parent[1])
        # gets the combination for offsprings of parents
        self.children = list(itertools.product(cpus, gpus))
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
        
        This function changes the genes of 2 random parents/children
        
        """
        
        # initializes the random numbers for indexes of gene pool
        # and parent 
        ran_num = random.randint(0, len(self.parents)-1)
        ran_num2 = random.randint(0, len(self.population)-1)
        rand_num3 = random.randint(0, len(self.parents)-1)
        while rand_num3 == ran_num:
            rand_num3 = random.randint(0, len(self.parents)-1)
        rand_num4 = random.randint(0, len(self.population)-1)
        while rand_num4 == ran_num2:
            rand_num4 = random.randint(0, len(self.population)-1)
        # changes genes of parent/children
        self.parents[ran_num][0] = self.population[ran_num2][0]
        self.parents[rand_num3][1] = self.population[rand_num4][1]
                
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
        return self.solution
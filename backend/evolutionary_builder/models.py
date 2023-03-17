from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CPU(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(null=False, max_length=100)
    price = models.DecimalField(default=0, decimal_places=2, max_digits=15)
    benchmark = models.DecimalField(default=0, decimal_places=2, max_digits=15)
    date = models.DateField()
    
class GPU(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(null=False, max_length=100)
    price = models.DecimalField(default=0, decimal_places=2, max_digits=15)
    benchmark = models.DecimalField(default=0, decimal_places=2, max_digits=15)
    date = models.DateField()
    
class RAM(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(null=False, max_length=100)
    price = models.DecimalField(default=0, decimal_places=2, max_digits=15)
    benchmark = models.DecimalField(default=0, decimal_places=2, max_digits=15)
    date = models.DateField()
    
class Build(models.Model):
    id = models.AutoField(primary_key=True)
    budget = models.IntegerField(null=False, default=1000)
    cpu_brand = models.CharField(max_length=5, default="")
    gpu_brand = models.CharField(max_length=7, default="")
    cpu_budget = models.IntegerField(default=0)
    gpu_budget = models.IntegerField(default=0)
    ram_budget = models.IntegerField(default=0)
    cpu_id = models.ManyToManyField(CPU)
    gpu_id = models.ManyToManyField(GPU)
    ram_id = models.ManyToManyField(RAM)
    
    def __str__(self):
        return self.id

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    build = models.ManyToManyField(Build)
    
    def __str__(self):
        return self.id
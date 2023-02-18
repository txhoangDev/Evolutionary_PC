from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Build(models.Model):
    id = models.AutoField(primary_key=True)
    budget = models.IntegerField(null=False, default=1000)
    cpu_brand = models.CharField(max_length=5, default="")
    gpu_brand = models.CharField(max_length=7, default="")
    cpu_budget = models.IntegerField(default=0)
    gpu_budget = models.IntegerField(default=0)
    ram_budget = models.IntegerField(default=0)
    cpu = models.CharField(max_length=100, default="", null=False)
    gpu = models.CharField(max_length=100, default="", null=False)
    ram = models.CharField(max_length=100, default="", null=False)
    
    def __str__(self):
        return self.id

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    build = models.ManyToManyField(Build)
    
    def __str__(self):
        return self.id
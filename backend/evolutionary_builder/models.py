from django.db import models

# Create your models here.
class Build(models.Model):
    id = models.AutoField(primary_key=True)
    budget = models.IntegerField(null=False, default=1000)
    cpu_brand = models.CharField(max_length=5, default="")
    gpu_brand = models.CharField(max_length=7, default="")
    cpu_budget = models.IntegerField(default=0)
    gpu_budget = models.IntegerField(default=0)
    ram_budget = models.IntegerField(default=0)
    # cooler_type = models.CharField(max_length=6, default="AIR")
    cpu = models.CharField(max_length=100, default="", null=False)
    gpu = models.CharField(max_length=100, default="", null=False)
    ram = models.CharField(max_length=100, default="", null=False)
    # mb = models.CharField(max_length=100, default="", null=False)
    # case = models.CharField(max_length=100, default="", null=False)
    # psu = models.CharField(max_length=100, default="", null=False)
    # storage = models.CharField(max_length=100, default="", null=False)
    # cooler = models.CharField(max_length=100, default="")
    
    def __str__(self):
        return self.id
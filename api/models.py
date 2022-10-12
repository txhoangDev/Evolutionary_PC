# imports
from unicodedata import decimal
from django.db import models
import string
import random

def generate_unique_code():
    """
    
    This function checks if the hashes of each build stored is unique

    Returns:
        string: returns a unique string for the given builds
    """
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Builds.objects.filter(code=code).count() == 0:
            break
    return code
        
class Builds(models.Model):
    """
    This creates a model for a given build with the given attributes
    """
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    budget = models.IntegerField(null=False, default=1000)
    cpu_type = models.CharField(max_length=5, default="")
    gpu_type = models.CharField(max_length=7, default="")
    aio_pref = models.CharField(max_length=6, default="NO")
    cpu_name = models.CharField(max_length=50, default="", null=False)
    gpu_name = models.CharField(max_length=50, default="", null=False)
    ram_name = models.CharField(max_length=50, default="", null=False)
    mb_name = models.CharField(max_length=50, default="", null=False)
    case_name = models.CharField(max_length=50, default="", null=False)
    psu_name = models.CharField(max_length=50, default="", null=False)
    ssd_name = models.CharField(max_length=50, default="", null=False)
    aio_name = models.CharField(max_length=50, default="")
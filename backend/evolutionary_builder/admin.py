from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Build)
admin.site.register(User)
admin.site.register(CPU)
admin.site.register(GPU)
admin.site.register(RAM)
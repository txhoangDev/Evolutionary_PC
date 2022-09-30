from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('selection', index),
    path('final', index)
]
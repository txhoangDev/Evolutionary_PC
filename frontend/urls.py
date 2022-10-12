from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('simple-build', index),
    path('advanced-build', index),
    path('selection/<str:buildCode>', index)
]
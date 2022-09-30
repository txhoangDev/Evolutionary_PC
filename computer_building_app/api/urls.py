from django.urls import path
from .views import BuildView

urlpatterns = [
    path('home', BuildView.as_view())
]
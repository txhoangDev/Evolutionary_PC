from django.urls import path
from .views import BuildView, CreateBuildView

urlpatterns = [
    path('home', BuildView.as_view()),
    path('select', CreateBuildView.as_view())
]
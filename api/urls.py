from django.urls import path
from .views import *

urlpatterns = [
    path('home', BuildView.as_view()),
    path('advanced-builds', CreateAdvancedBuildView.as_view()),
    path('simple-builds', CreateSimpleBuildView.as_view()),
    path('get-build', GetBuild.as_view())
]
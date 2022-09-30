from django.shortcuts import render
# from django.http import HttpResponse
from rest_framework import generics
from .serializers import BuildSerializer
from .models import Builds

# Create your views here.
class BuildView(generics.ListAPIView):
    # query set indicates what is going to be returned
    queryset = Builds.objects.all()
    serializer_class = BuildSerializer
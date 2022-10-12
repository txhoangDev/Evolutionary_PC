from re import I
from django.shortcuts import render
from django.urls import is_valid_path
from rest_framework import generics, status
from setuptools import sic
from .serializers import *
from .models import Builds
from rest_framework.views import APIView
from rest_framework.response import Response
from .parts_generator.Computer_Building import run_evolution

# Create your views here.
class BuildView(generics.ListAPIView):
    # query set indicates what is going to be returned
    queryset = Builds.objects.all()
    serializer_class = BuildSerializer
    
class GetBuild(APIView):
    serializer_class = BuildSerializer
    lookup_url_kwarg = 'code'
    
    def get(self, request, format=None):
        buildCode = request.GET.get(self.lookup_url_kwarg)
        if buildCode != None:
            build = Builds.objects.filter(code=buildCode)
            if len(build) > 0:
                data = BuildSerializer(build[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'build not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code Parameter not found in request'}, status=status.HTTP_404_NOT_FOUND)
    
class CreateAdvancedBuildView(APIView):
    serializer_class = CreateAdvancedBuildSerializer
    
    def post(self, request, format=None):
        # creates sessions if user doesn't have one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            budget = serializer.data.get("budget")
            cpu_type = serializer.data.get("cpu_type")
            gpu_type = serializer.data.get("gpu_type")
            aio_pref = serializer.data.get("aio_pref")
            queryset = Builds.objects.filter(budget=budget)
            if queryset.exists():
                user_build = queryset[0]
                if user_build.cpu_name == "":
                    solution = run_evolution()
                    user_build.cpu_name = solution[0]
                    user_build.gpu_name = solution[1]
                    user_build.ram_name = solution[2]
                    user_build.save(update_fields=['cpu_name', 'gpu_name', 'ram_name'])
                    return Response(BuildSerializer(user_build).data, status=status.HTTP_201_CREATED)
                else:
                    return Response(BuildSerializer(user_build).data, status=status.HTTP_200_OK)
            else:
                user_build = Builds(budget=budget, cpu_type=cpu_type, gpu_type=gpu_type, aio_pref=aio_pref)
                user_build.save()
                return Response(BuildSerializer(user_build).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class CreateSimpleBuildView(APIView):
    serializer_class = CreateSimpleBuildSerializer
    
    def post(self, request, format=None):
        # creates sessions if user doesn't have one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            budget = serializer.data.get("budget")
            queryset = Builds.objects.filter(budget=budget).filter(cpu_type="").filter(gpu_type="").filter(aio_pref="NO")
            if queryset.exists():
                user_build = queryset[0]
                if user_build.cpu_name == "":
                    solution = run_evolution()
                    user_build.cpu_name = solution[0]
                    user_build.gpu_name = solution[1]
                    user_build.ram_name = solution[2]
                    user_build.save(update_fields=['cpu_name', 'gpu_name', 'ram_name'])
                    return Response(BuildSerializer(user_build).data, status=status.HTTP_201_CREATED)
                else:
                    return Response(BuildSerializer(user_build).data, status=status.HTTP_200_OK)
            else:
                user_build = Builds(budget=budget)
                user_build.save()
                return Response(BuildSerializer(user_build).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
from re import I
from django.shortcuts import render
from django.urls import is_valid_path
# from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import BuildSerializer, CreateBuildSerializer
from .models import Builds
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class BuildView(generics.ListAPIView):
    # query set indicates what is going to be returned
    queryset = Builds.objects.all()
    serializer_class = BuildSerializer
    
class CreateBuildView(APIView):
    serializer_class = CreateBuildSerializer
    
    def post(self, request, format=None):
        # if the current user has a current session
        if not self.request.session.exists(self.request.session.session_key):
            # creates sessions if user doesn't have one
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            budget = serializer.data.get("budget")
            cpu_type = serializer.data.get("cpu_type")
            gpu_type = serializer.data.get("gpu_type")
            aio_pref = serializer.data.get("aio_pref")
            # queryset = Builds.objects.filter(budget=budget).filter(cpu_type=cpu_type).filter(gpu_type=gpu_type).filter(aio_pref=aio_pref)
            # if queryset.exists():
            #     user_build = queryset
            #     return Response(BuildSerializer(user_build).data, status=status.HTTP_200_OK)
            # else:
            user_build = Builds(budget=budget, cpu_type=cpu_type, gpu_type=gpu_type, aio_pref=aio_pref)
            user_build.save()
            return Response(BuildSerializer(user_build).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
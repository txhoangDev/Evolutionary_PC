# imports
from rest_framework import serializers
from .models import Builds

class BuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Builds
        fields = ('id', 'hash', 'budget', 'cpu_type', 'gpu_type', 'aio_pref', 'cpu_name', 'gpu_name', 'ram_name', 'mb_name', 'case_name', 'psu_name', 'ssd_name', 'aio_name')

class CreateBuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Builds
        fields = ('budget', 'cpu_type', 'gpu_type', 'aio_pref')
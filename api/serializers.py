# imports
from rest_framework import serializers
from .models import Builds

class BuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Builds
        fields = '__all__'

class CreateAdvancedBuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Builds
        fields = ('budget', 'cpu_type', 'gpu_type', 'aio_pref')

class CreateSimpleBuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Builds
        fields = ('budget',)
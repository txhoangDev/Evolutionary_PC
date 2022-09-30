# imports
from rest_framework import serializers
from .models import Builds

class BuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Builds
        fields = ('id', 'hash', 'budget', 'cpu_type', 'gpu_type', 'aio_pref')
        
from rest_framework import serializers

from .models import *

class BuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Build
        fields = ('__all__')
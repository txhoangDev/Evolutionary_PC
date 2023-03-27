from rest_framework import serializers
from django.contrib.auth import authenticate
from dj_rest_auth.serializers import PasswordResetSerializer, LoginSerializer
from .form import CustomResetPasswordForm
from .models import *

class BuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Build
        fields = ('__all__')
        
class CPUSerializer(serializers.ModelSerializer):
    class Meta: 
        model = CPU
        fields = ('__all__')
        
class GPUSerializer(serializers.ModelSerializer):
    class Meta: 
        model = GPU
        fields = ('__all__')
        
class RAMSerializer(serializers.ModelSerializer):
    class Meta: 
        model = RAM
        fields = ('__all__')
        
class CustomPasswordResetConfirmSerializer(PasswordResetSerializer):
    def validate_email(self, value):
        # use the custom reset form
        self.reset_form = CustomResetPasswordForm(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(self.reset_form.errors)

        return value
    
class CustomLoginSerializer(LoginSerializer):
    def authenticate(self, **kwargs):
        if self.context['request'].data['remember']:
            self.context['request'].session.set_expiry(60 * 60 * 24 * 30)
        else:
            self.context['request'].session.set_expiry(60 * 60 * 24)
        return authenticate(self.context['request'], **kwargs)
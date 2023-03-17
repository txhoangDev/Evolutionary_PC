from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from allauth.account.signals import email_confirmed
from django.dispatch import receiver
from allauth.account.utils import perform_login
from django.views.decorators.csrf import csrf_protect 

from .models import *
from evolutionary_builder.serializers import *
from .core import *

# Create your views here.
@receiver(email_confirmed)
def email_confirmed_(request, email_address, **kwargs):
    user = email_address.user
    user.isactive = True
    user.save()
    perform_login(request, user, 'allauth.account.auth_backends.AuthenticationBackend')

@api_view(['GET'])
@csrf_protect
def get_csrf_token(request):
    response = Response({'message': request.COOKIES.get('csrftoken')})
    response['x-csrftoken'] = request.COOKIES.get('csrftoken')
    return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def all_builds(request):
    data = Build.objects.all()
    serializer = BuildSerializer(data, context={'request': request}, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def create_build(request):
    user = User.objects.get(pk=request.user.id)
    try:
        existing = Build.objects.get(budget=request.data['budget'], 
                                     cpu_budget=request.data['cpu_budget'],
                                     cpu_brand=request.data['cpu_brand'],
                                     gpu_budget=request.data['gpu_budget'],
                                     gpu_brand=request.data['gpu_brand'],
                                     ram_budget=request.data['ram_budget'])
        if existing:
            serializer = BuildSerializer(existing, context={'request': request})
            user.build.add(serializer.data['id'])
            return Response(status=status.HTTP_201_CREATED)
    except:
        components = generate_components(budget=request.data['budget'],
                                   cpu_type=request.data['cpu_brand'], 
                                   gpu_type=request.data['gpu_brand'],
                                   cpu_budget=request.data['cpu_budget'],
                                   gpu_budget=request.data['gpu_budget'],
                                   ram_budget=request.data['ram_budget'])
        new_build = {
            'budget': request.data['budget'],
            'cpu_brand': request.data['cpu_brand'], 
            'gpu_brand': request.data['gpu_brand'],
            'cpu_budget': request.data['cpu_budget'],
            'gpu_budget': request.data['gpu_budget'],
            'ram_budget': request.data['ram_budget'],
            'cpu_id': [components[0]['id']],
            'gpu_id': [components[1]['id']],
            'ram_id': [components[2]['id']]
        }
        serializer = BuildSerializer(data=new_build)
        if serializer.is_valid():
            serializer.save()
            user.build.add(serializer.data['id'])
            return Response(status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def build_details(request, pk):
    try:
        build = Build.objects.get(id=pk)
    except Build.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializers = BuildSerializer(build, context={'request': request})
        build_info = {}
        curr_cpu = CPU.objects.get(id=serializers.data['cpu_id'])
        cpu_data = CPUSerializer(curr_cpu).data
        curr_gpu = GPU.objects.get(id=serializers.data['gpu_id'])
        gpu_data = GPUSerializer(curr_gpu).data
        curr_ram = RAM.objects.get(id=serializers.data['ram_id'])
        ram_data = RAMSerializer(curr_ram).data
        build_info['cpu'] = cpu_data['name']
        build_info['cpu_price'] = cpu_data['price']
        build_info['gpu'] = gpu_data['name']
        build_info['gpu_price'] = gpu_data['price']
        build_info['ram'] = ram_data['name']
        build_info['ram_price'] = ram_data['price']
        return Response(data=build_info, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        build.delete()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

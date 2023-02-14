from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import Build
from evolutionary_builder.serializers import *
from algorithm.Computer_Building import run_evolution
from .core import *

# Create your views here.
@ensure_csrf_cookie
@api_view([])
def set_csrf_token(request):
    return Response(data={"details": "CSRF cookie set"}, status=status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def all_builds(request):
    data = Build.objects.all()
    serializer = BuildSerializer(data, context={'request': request}, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# @authentication_classes([SessionAuthentication])
# def create_build(request):
#     try:
#         existing = Build.objects.get(budget=request.data['budget'], 
#                                      cpu_budget=request.data['cpu_budget'],
#                                      cpu_brand=request.data['cpu_brand'],
#                                      gpu_budget=request.data['gpu_budget'],
#                                      gpu_brand=request.data['gpu_brand'],
#                                      ram_budget=request.data['ram_budget'])
#         if existing:
#             serializer = BuildSerializer(existing, context={'request': request})
#             return Response(data=serializer.data['id'], status=status.HTTP_200_OK)
#     except:
#         parts_dict = run_evolution(budget=request.data['budget'],
#                                    cpu_type=request.data['cpu_brand'], 
#                                    gpu_type=request.data['gpu_brand'],
#                                    cpu_budget=request.data['cpu_budget'],
#                                    gpu_budget=request.data['gpu_budget'],
#                                    ram_budget=request.data['ram_budget'])
#         parts = list(parts_dict.keys())
#         new_build = {
#             'budget': request.data['budget'],
#             'cpu_type': request.data['cpu_brand'], 
#             'gpu_type': request.data['gpu_brand'],
#             'cpu_budget': request.data['cpu_budget'],
#             'gpu_budget': request.data['gpu_budget'],
#             'ram_budget': request.data['ram_budget'],
#             'cpu': parts[0],
#             'gpu': parts[1],
#             'ram': parts[2]
#         }
#         serializer = BuildSerializer(data=new_build)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(data=serializer.data['id'], status=status.HTTP_201_CREATED)
#         else:
#             return Response(status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# @authentication_classes([SessionAuthentication])
# def build_details(request, pk):
#     try:
#         build = Build.objects.get(id=pk)
#     except Build.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     if request.method == 'GET':
#         serializers = BuildSerializer(build, context={'request': request})
#         build_info = {}
#         build_info['build'] = serializers.data
#         build_info['cpu_price'] = get_cpu_price(serializers.data['cpu'])
#         build_info['gpu_price'] = get_gpu_price(serializers.data['gpu'])
#         build_info['ram_price'] = get_ram_price(serializers.data['ram'])
#         return Response(data=build_info, status=status.HTTP_200_OK)

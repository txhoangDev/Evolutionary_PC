from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Build
from .serializers import *

# Create your views here.
@api_view(['GET', 'POST'])
def builds_list(request):
    if request.method == 'GET':
        data = Build.objects.all()
        serializer = BuildSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
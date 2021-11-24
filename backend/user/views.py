from rest_framework import viewsets
from .serializers import UserSerializer
from .models import Users

# Create your views here.

class UserView(viewsets.ModelViewSet):
  serializer_class = UserSerializer
  queryset = Users.objects.all()

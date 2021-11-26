from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed
from .serializers import TodoSerializer
from user.models import Users
from .models import Todos
import jwt

# Create your views here.

class TodoView(viewsets.ModelViewSet):

  serializer_class = TodoSerializer

  def get_queryset(self):
    user = get_user(self)
    return Todos.objects.filter(user=user)

  def perform_create(self, serializer):
    user = get_user(self)
    serializer.save(user=user)


# personal function for getting the authenticated user
def get_user(source):
  token = source.request.COOKIES.get('jwt')
  if not token:
    raise AuthenticationFailed('Unauthenticated')
  try:
    payload = jwt.decode(token, 'secret_user', algorithm=['HS256'])
  except jwt.ExpiredSignatureError:
    raise AuthenticationFailed('Unauthenticated')
  return Users.objects.filter(id=payload['id']).first()

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import Users
import jwt, datetime

# Create your views here.

class RegisterView(APIView):
  def post(self, request):
    new_id = Users.objects.latest('id').id + 1
    request.data["id"] = new_id

    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response()

class LoginView(APIView):
  def post(self, request):
    email = request.data['email']
    password = request.data['password']
    user = Users.objects.filter(email=email).first()

    if user is None:
      raise AuthenticationFailed('User not found')
    if not user.check_password(password):
      raise AuthenticationFailed('Incorrect password')
    
    payload = {
      'id': user.id,
      'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=240),
      'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, 'secret_user', algorithm='HS256').decode('utf-8')
    
    response = Response()
    response.set_cookie(key='jwt', value=token)
    response.data = UserSerializer(user).data

    return response

class UserView(APIView):
  def get(self, request):
    token = request.COOKIES.get('jwt')
    if not token:
      raise AuthenticationFailed('Unauthenticated')
    try:
      payload = jwt.decode(token, 'secret_user', algorithm=['HS256'])
    except jwt.ExpiredSignatureError:
      raise AuthenticationFailed('Unauthenticated')
    user = Users.objects.filter(id=payload['id']).first()

    serializer = UserSerializer(user)
    return Response(serializer.data)

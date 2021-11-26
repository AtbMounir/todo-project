from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Users(AbstractUser):
  id = models.BigIntegerField(primary_key=True)
  email = models.CharField(db_column='mail', max_length=255, unique=True)
  username = models.CharField(db_column='name', max_length=255, unique=True)
  password = models.CharField(db_column='pass', max_length=255)

  last_login = None
  is_superuser = None
  first_name = None
  last_name = None
  is_staff = None
  is_active = None
  date_joined = None

  USERNAME_FIELD = 'username'
  REQUIRED_FIELDS = []
  
  class Meta:
    managed = False
    db_table = 'users'

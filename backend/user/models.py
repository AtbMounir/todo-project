from django.db import models

# Create your models here.

class Users(models.Model):
  id = models.BigIntegerField(primary_key=True)
  name = models.CharField(max_length=255)
  mail = models.CharField(max_length=255)
  pass_field = models.CharField(db_column='pass', max_length=255)
  
  class Meta:
    managed = False
    db_table = 'users'

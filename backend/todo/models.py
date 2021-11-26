from django.db import models
from user.models import Users

# Create your models here.

class Todos(models.Model):
  id = models.BigIntegerField(primary_key=True)
  title = models.CharField(max_length=255)
  description = models.TextField(blank=True, null=True)
  completed = models.BooleanField()
  user = models.ForeignKey(Users, on_delete=models.CASCADE, null=False)
  
  class Meta:
    managed = False
    db_table = 'todos'

from django.db import models

# Create your models here.

class Todos(models.Model):
  id = models.BigIntegerField(primary_key=True)
  title = models.CharField(max_length=255)
  description = models.TextField(blank=True, null=True)
  completed = models.BooleanField()
  user = models.ForeignKey('user.Users', models.DO_NOTHING)
  
  class Meta:
    managed = False
    db_table = 'todos'

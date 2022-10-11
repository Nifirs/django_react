from django.db import models

# Create your models here.

class Comment(models.Model):
    user_name=models.TextField(null=True,blank=True)
    body=models.TextField(null=True,blank=True)
    updated=models.DateTimeField(auto_now=True)
    created=models.DateTimeField(auto_now_add=True)
    is_approve = models.BooleanField(default=False)
    album_id=models.TextField(null=True,blank=True)

    def __str__(self):
        return self.user_name[0:50]

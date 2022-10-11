from django.urls import path
from . import views
urlpatterns = [
    path('', views.getRoutes,name='routes'),
    path('comments_list/', views.getComments,name='comments'),
    path('comments_list/create', views.createComment,name='create_comment'),
    path('comments_list/<str:pk>', views.getComment,name='comment'),
    path('comments_list/update/<str:pk>', views.updateComment,name='update_comment'),
    path('comments_list/delete/<str:pk>', views.deleteComment,name='delete_comment'),
]
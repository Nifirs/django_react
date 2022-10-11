from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Comment
from .serializers import CommentSerializer
# Create your views here.



@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)

@api_view(['POST'])
def createComment(request):
    data=request.data 
    comment=Comment.objects.create(
        body=data['body'],
        user_name=data['user_name'],
        album_id=data['album_id']
    )
    serializer=CommentSerializer(comment,many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getComments(request):
    comments=Comment.objects.all().filter(is_approve=True).order_by('-updated')
    # comments=Comment.objects.all().order_by('-updated')
    serializer=CommentSerializer(comments,many=True)

    return Response(serializer.data)

@api_view(['GET'])
def getComment(request,pk):

    comments=Comment.objects.get(id=pk)
    serializer=CommentSerializer(comments,many=False)

    return Response(serializer.data)


@api_view(['PUT'])
def updateComment(request,pk):
    data=request.data 
    comment=Comment.objects.get(id=pk)
    serializer=CommentSerializer(instance=comment,data=data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteComment(request,pk):
    comment=Comment.objects.get(id=pk)
    comment.delete()
    return Response('Comment Deleted!')
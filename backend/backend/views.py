from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RegisterSerializer, JobSerializer, ApplicationSerializer
from rest_framework import status 
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Job,Application

@api_view(['GET'])
def helloAPI(request):
    return Response({"message":"API responding Hello for GET Request"})


@api_view(['POST'])
def registerUser(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response({"message" : "User Registered Successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def basicLogin(request):
    username=request.data.get('username')
    password=request.data.get('password')

 
    user = authenticate(username=username, password=password)
    if user is None:
        return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    return Response({"user_id":user.id, "username":user.username,"message": "Login OK"}, status=status.HTTP_200_OK)



@api_view(['GET'])
def jobList(request):
    jobs=Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def applyJob(request):
    serializer = ApplicationSerializer(data=request.data)
    job_id = request.data.get("job")
    applicant_id = request.data.get("applicant")
    if Application.objects.filter(job_id=job_id, applicant_id=applicant_id).exists():
        return Response({"message":"You have already applied for this Job"},status=status.HTTP_400_BAD_REQUEST)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"Application Subitted"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

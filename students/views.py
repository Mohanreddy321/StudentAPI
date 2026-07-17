from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

from .models import Student
from .serializers import StudentSerializer


@ensure_csrf_cookie
def home(request):
    return render(request, "index.html")


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]
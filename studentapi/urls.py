from django.contrib import admin
from django.urls import path, include

urlpatterns = [

    path("admin/", admin.site.urls),

    path("", include("students.urls")),

    path("api/", include("students.api_urls")),

    path("auth/", include("accounts.urls")),

]
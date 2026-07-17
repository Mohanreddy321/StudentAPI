from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import RegisterView, login_page, register_page

urlpatterns = [

    # API URLs
    path("register/", RegisterView.as_view(), name="register_api"),
    path("login/", TokenObtainPairView.as_view(), name="login_api"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # HTML Pages
    path("login-page/", login_page, name="login_page"),
    path("register-page/", register_page, name="register_page"),

]
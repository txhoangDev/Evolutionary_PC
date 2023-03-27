"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include, re_path
from .views import *
from dj_rest_auth.registration.views import VerifyEmailView
from dj_rest_auth.views import PasswordResetConfirmView

urlpatterns = [
    path('all-builds/', all_builds),
    path('create-build/', create_build),
    path('build/<int:pk>/', build_details),
    path('get-token/', get_csrf_token),
    path('components/', get_lowest_prices),
    path('', include('dj_rest_auth.urls')),
    re_path(
        r"password/reset/key/(?P<uidb36>[0-9A-Za-z]+)-(?P<key>.+)/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path('registration/', include('dj_rest_auth.registration.urls')),
    re_path(r'^verify-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_verify_email'),
]
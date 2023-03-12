from allauth.account.adapter import get_adapter
from allauth.account.forms import ResetPasswordForm
from allauth.account.utils import user_pk_to_url_str
from django.urls import reverse
from django.conf import settings
from allauth.utils import build_absolute_uri
from allauth.account import app_settings
from allauth.account.utils import (user_pk_to_url_str, user_username)

class CustomResetPasswordForm(ResetPasswordForm):
    def save(self, request, **kwargs):
        email = self.cleaned_data['email']
        token_generator = kwargs.get('token_generator')
        for user in self.users:
            uid = user_pk_to_url_str(user)
            token_generator = kwargs.get('token_generator')
            token = token_generator.make_token(user)
            path = reverse(
                'password_reset_confirm',
                args=[user_pk_to_url_str(user), token],
            )
            if getattr(settings, 'REST_AUTH_PW_RESET_USE_SITES_DOMAIN', False) is True:
                url = build_absolute_uri(None, path)
            else:
                url = build_absolute_uri(request, path)
            context = {'current_site': 'Evolutionary PC', 
                       "user": user, 
                       "request": request, 
                       "password_reset_url": 'http://localhost:3000/account/forgot/' + uid + '/' + token}
            if app_settings.AUTHENTICATION_METHOD != app_settings.AuthenticationMethod.EMAIL:
                context['username'] = user_username(user)
            get_adapter(request).send_mail(
                'account/email/password_reset_key', email, context
            )
        return self.cleaned_data['email']
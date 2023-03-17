from django.core.management.utils import get_random_secret_key; 

env = open(".env", "w")
env.write('DJANGO_KEY="' + get_random_secret_key() + '"\n')
env.write('EMAIL="dummyemail@dumb.com"\n')
env.write('EMAIL_PASS="testpassword"\n')
env.write('SESSION_COOKIE_SECURE="True"')
print("Remember to go in and change the EMAIL variable and the EMAIL_PASS variable")
print("If your cookie is not being saved in your browser, change SESSION_COOKIE_SECURE to be false")
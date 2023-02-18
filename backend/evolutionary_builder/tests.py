from django.test import TestCase
from django.core import mail
from rest_framework import status
from rest_framework.test import APITestCase

# Create your tests here.
class AccountsTestCase(APITestCase):
    register_url = "/api/auth/registration/"
    verify_email_url = "/api/verify-email/"
    login_url = "/api/auth/login/"
    
    def test_register(self):
        # test registration with email verification sent
        data = {
            "email": "user2@example-email.com",
            "username": "user2test",
            "password1": "verysecret",
            "password2": "verysecret",
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["detail"], "Verification e-mail sent.")
        
        # tests login with no email verification
        login_data = {
            "email": data["email"],
            "password": data["password1"],
        }
        response = self.client.post(self.login_url, login_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue("E-mail is not verified." in response.json()["non_field_errors"])
        
        # tests to make sure the email verification was sent
        self.assertEqual(len(mail.outbox), 1)
        email_lines = mail.outbox[0].body.splitlines()
        activation_line = [l for l in email_lines if "verify-email" in l][0]
        activation_link = activation_line.split("go to ")[1]
        activation_key = activation_link.split("/")[5]
        
        response = self.client.post(self.verify_email_url+activation_key+"/", {"key": activation_key})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["detail"], "ok")
        response = self.client.post(self.login_url, login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("access_token" in response.json())
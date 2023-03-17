
# Evolutionary PC Backend

This is the backend of the application and is hosted by Django. 


## Run Locally
Backend dependencies installation:
```bash
  cd backend
  pip install -r requirements.txt
```

Generate .env file:
```bash
python generate_env.py
```

Django Commands to run before starting server:
```bash
  python manage.py makemigrations evolutionary_builder
  python manage.py migrate evolutionary_builder
  python manage.py migrate
  python manage.py scrape_cpu
  python manage.py scrape_ram
  python manage.py scrape_gpu
```
Start the server
```bash
  python manage.py runserver
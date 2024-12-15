from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'    # Ustawia identyfikator aplikacji na 'api', co musi odpowiadać nazwie folderu aplikacji.

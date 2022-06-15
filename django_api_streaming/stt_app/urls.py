from django.urls.conf import path
from . import views

app_name = 'swp'
urlpatterns = [
    path('', views.index, name='index'),
    path('handleaudio/', views.handle_audio, name='handleaudio')
]
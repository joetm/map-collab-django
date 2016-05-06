from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^features/$', views.features, name='features'),
    url(r'^features/(\d+)$', views.feature, name='feature'),
]

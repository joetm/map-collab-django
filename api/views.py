from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import get_object_or_404, get_list_or_404

# https://docs.djangoproject.com/en/1.9/topics/http/decorators/
from django.views.decorators.http import require_http_methods, require_GET

# import json


def respondWith(obj):
    response = JsonResponse(obj, safe=False) # safe: allow serialization of non-dict objects
    # set header fields
    # response['Content-Type'] = ''
    # response['Content-Length'] = len(string)
    return response


# API index page
def index(request):
    return HttpResponse("API v0")


# all features
@require_GET # only allow GET requests for this route
def features(request):

    # TODO: get the shapes from the db
    shapes = []

    return respondWith(shapes)

# single feature
@require_http_methods(["GET", "POST", "PUT"])
def feature(request, id):

    # TODO: get the shape from the db
    shape = {}

    return respondWith(shape)


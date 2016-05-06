from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

import json

def index(request):
    return HttpResponse("API v0")

def features(request):

    # TODO: get the shapes from the db

    shapes = json.dumps([])

    response = HttpResponse(shapes)

    # set header fields
    response['Content-Type'] = 'application/json'
    response['Content-Length'] = len(shapes)

    return response

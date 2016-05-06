from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def index(request):
    # return HttpResponse("Index page describing the service...")
    template = loader.get_template('clientside/index.html')
    context = {
        'somevars': [],
    }
    return HttpResponse(template.render(context, request))

def map(request):
    # return HttpResponse("Map should go here...")
    template = loader.get_template('clientside/map.html')
    context = {
        'somevars': [],
    }
    return HttpResponse(template.render(context, request))

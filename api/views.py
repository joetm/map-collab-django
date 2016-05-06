from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpRequest
from django.template import loader
from django.shortcuts import get_object_or_404, get_list_or_404

# from django.core import serializers

from django.http import QueryDict

from django.utils import timezone

from .models import Shape

import json

# https://docs.djangoproject.com/en/1.9/topics/http/decorators/
from django.views.decorators.http import require_http_methods, require_GET

# import json


def respondWithJSON(obj):
    # response = JsonResponse(serializers.serialize('json', obj), safe=False) # safe: allow serialization of non-dict objects
    response = JsonResponse(obj, safe=False) # safe: allow serialization of non-dict objects
    # set additional header fields
    response['Content-Length'] = len(response.content)
    return response


# API index page
def index(request):
    return HttpResponse("API v0")


# all features
# @require_GET # only allow GET requests for this route
@require_http_methods(["GET", "POST"])
def features(request):

    # return all features
    if request.method == "GET":

        shape = list(Shape.objects.all())

    # create a new feature
    else:

        # filter keys
        body = json.loads(request.body)
        accepted_keys = ['_leaflet_id', 'encoded', 'options', 'type', 'center', 'boundary'] # 'created'
        filtered_dict = { key: body.get(key, None) for key in accepted_keys }

        # if not filtered_dict.get('created'):
        filtered_dict['created'] = timezone.now()
        # if not filtered_dict.get('updated'):
        filtered_dict['updated'] = timezone.now()

        # need to flatten the center
        filtered_dict['center_lat'] = filtered_dict['center']['lat']
        filtered_dict['center_lng'] = filtered_dict['center']['lng']
        del filtered_dict['center']

        # need to flatten the boundary
        filtered_dict['boundary_top'] = filtered_dict['boundary']['top']
        filtered_dict['boundary_bottom'] = filtered_dict['boundary']['bottom']
        filtered_dict['boundary_left'] = filtered_dict['boundary']['left']
        filtered_dict['boundary_right'] = filtered_dict['boundary']['right']
        del filtered_dict['boundary']

        # create new shape
        shape = Shape(**filtered_dict)

        # save the shape
        shape.save()

    # return the shape in the response
    return respondWithJSON(shape)


# single feature
@require_http_methods(["GET", "PUT"])
def feature(request, id):

    # TODO

    if request.method == "GET":

        # get the shape
        shape = Shape.objects.get(pk=id)

    else:

        # TODO: update the shape

        shape = get_object_or_404(Shape, pk=id)

        # ...

    # return the shape in the response
    return respondWithJSON(shape)


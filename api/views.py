from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpRequest
from django.template import loader
from django.shortcuts import get_object_or_404, get_list_or_404

# https://docs.djangoproject.com/en/1.9/topics/serialization/
from django.core import serializers
# JSONSerializer = serializers.get_serializer("json")
# json_serializer = JSONSerializer()

from django.http import QueryDict

from django.utils import timezone

from django.forms.models import model_to_dict

from .models import Shape, Rectangle, Polygon, Polyline, Circle, Marker

import json

# https://docs.djangoproject.com/en/1.9/topics/http/decorators/
from django.views.decorators.http import require_http_methods, require_GET

import json



def output(obj):
    # model_to_dict
    response = JsonResponse(obj, safe=False) # safe: allow serialization of non-dict objects
    # set additional header fields
    return response


# API index page
def index(request):
    return HttpResponse("API v0")


def ShapeFactory(filtered_dict):

    if not filtered_dict['type']:
        raise # TODO - raise the right Django exception

    if filtered_dict['type'] == 'Marker':
        Obj = Marker
    elif filtered_dict['type'] == 'Circle':
        Obj = Circle
    elif filtered_dict['type'] == 'Polyline':
        Obj = Polyline
    elif filtered_dict['type'] == 'Polygon':
        Obj = Polygon
    elif filtered_dict['type'] == 'Rectangle':
        Obj = Rectangle
    else:
        Obj = Shape

    return Obj(**filtered_dict)


# all features
# @require_GET # only allow GET requests for this route
@require_http_methods(["GET", "POST"])
def features(request):

    # return all features
    if request.method == "GET":

        # get the objects
        shapes = Shape.objects.all()

        # only need the model's fields on the clientside
        # fields = [ o._meta.fields for o in shapes ]
        # print serializers.serialize("json", fields)

        # jsonlist = json.loads(json_str)
        # print jsonlist
        # fields = [ o._meta.get_fields() for o in shapes ]
        # print fields

        # return the shapes as JSON in the response
        # these serializers are a load of crap. E.g. this will include unicode string -> u'string'
        # response = HttpResponse(serializers.serialize("json", shapes))

        response = HttpResponse(serializers.serialize("json", shapes))

        response['Content-Length'] = len(response.content)

        return response

    # create a new feature
    else:

        # filter keys
        body = json.loads(request.body)
        accepted_keys = ['_leaflet_id', 'encoded', 'options', 'type'] # 'center', 'boundary'
        filtered_dict = { key: body.get(key, None) for key in accepted_keys }

        # if not filtered_dict.get('created'):
        filtered_dict['created'] = timezone.now()
        # if not filtered_dict.get('updated'):
        filtered_dict['updated'] = timezone.now()

        # need to flatten the center
        # filtered_dict['center_lat'] = filtered_dict['center']['lat']
        # filtered_dict['center_lng'] = filtered_dict['center']['lng']
        # del filtered_dict['center']

        # need to flatten the boundary
        # filtered_dict['boundary_top'] = filtered_dict['boundary']['top']
        # filtered_dict['boundary_bottom'] = filtered_dict['boundary']['bottom']
        # filtered_dict['boundary_left'] = filtered_dict['boundary']['left']
        # filtered_dict['boundary_right'] = filtered_dict['boundary']['right']
        # del filtered_dict['boundary']

        # create new shape
        shape = ShapeFactory(filtered_dict)

        # save the shape
        shape.save()

        response = JsonResponse(serializers.serialize("json", shape), safe=False)
        response['Content-Length'] = len(response.content)

        return response


# single feature
@require_http_methods(["GET", "PUT"])
def feature(request, id):

    # TODO

    if request.method == "GET":

        # get the shape
        # shape = Shape.objects.get(pk=id)
        shape = get_object_or_404(Shape, pk=id)

    else:

        # TODO: update the shape

        # get the shape
        shape = get_object_or_404(Shape, pk=id)

        # ...

    # return the shape in the response
    response = JsonResponse(serializers.serialize("json", shape), safe=False)
    response['Content-Length'] = len(response.content)

    return response


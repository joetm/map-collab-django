from __future__ import unicode_literals

from django.db import models


class Shape(models.Model):

    # def __init__(self):
    #     shapeList = [(cls.__name__.lower(), cls.__name__) for cls in vars()['Shape'].__subclasses__()]
    #     self.shape_type = models.CharField(max_length=20, choices=shapeList)

    # id = models.AutoField(primary_key=True)

    _leaflet_id = models.PositiveIntegerField(primary_key=True)

    type = models.CharField(max_length=20)

    # slug = models.SlugField(max_length=50)

    created = models.DateTimeField('date created')
    updated = models.DateTimeField('last update')

    leafletJSON = models.TextField() # stores the Leaflet feature as a JSON object

    center_lat = models.DecimalField(max_digits=16, decimal_places=13)
    center_lng = models.DecimalField(max_digits=16, decimal_places=13)

    boundary_left   = models.DecimalField(max_digits=9, decimal_places=6)
    boundary_right  = models.DecimalField(max_digits=9, decimal_places=6)
    boundary_top    = models.DecimalField(max_digits=9, decimal_places=6)
    boundary_bottom = models.DecimalField(max_digits=9, decimal_places=6)

    encoded = models.CharField(max_length=250)
    options = models.TextField() # stores the Leaflet feature as a JSON object

class Rectangle(Shape):
    type = __name__.lower()

class Polygon(Shape):
    type = __name__.lower()

class Polyline(Shape):
    type = __name__.lower()

class Circle(Shape):
    radius = models.FloatField()
    type = __name__.lower()

class Marker(Shape):
    type = __name__.lower()



# get all available shapes
# shapeList = [(cls.__name__.lower(), cls.__name__) for cls in vars()['Shape'].__subclasses__()]
# print shapeList
# Shape.shape_type = models.CharField(max_length=20, choices=shapeList) # [('green', 'green'), ('red', 'red')]



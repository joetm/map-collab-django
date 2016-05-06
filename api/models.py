from __future__ import unicode_literals

from django.db import models


class Shape(models.Model):

    # def __init__(self):
    #     shapeList = [(cls.__name__.lower(), cls.__name__) for cls in vars()['Shape'].__subclasses__()]
    #     self.shape_type = models.CharField(max_length=20, choices=shapeList)

    shape_type = models.CharField(max_length=20)

    # slug = models.SlugField(max_length=50)
    creation_date = models.DateTimeField('date created')
    leafletJSON = models.TextField() # stores the Leaflet feature as a JSON object

    center_lat = models.DecimalField(max_digits=9, decimal_places=6)
    center_lng = models.DecimalField(max_digits=9, decimal_places=6)

    boundary_left   = models.DecimalField(max_digits=9, decimal_places=6)
    boundary_right  = models.DecimalField(max_digits=9, decimal_places=6)
    boundary_top    = models.DecimalField(max_digits=9, decimal_places=6)
    boundary_bottom = models.DecimalField(max_digits=9, decimal_places=6)

class Rectangle(Shape):
    shape_type = __name__

class Polygon(Shape):
    shape_type = __name__

class Line(Shape):
    shape_type = __name__

class Circle(Shape):
    radius = models.FloatField()
    shape_type = __name__

class Marker(Shape):
    shape_type = __name__



# get all available shapes
# shapeList = [(cls.__name__.lower(), cls.__name__) for cls in vars()['Shape'].__subclasses__()]
# print shapeList
# Shape.shape_type = models.CharField(max_length=20, choices=shapeList) # [('green', 'green'), ('red', 'red')]



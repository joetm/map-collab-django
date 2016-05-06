from __future__ import unicode_literals

from django.db import models


class Shape(models.Model):
    name = models.CharField(max_length=15)
    creation_date = models.DateTimeField('date created')
    leafletJSON = models.TextField() # stores the Leaflet feature as a JSON object

    center_lat = models.DecimalField(max_digits=9, decimal_places=6)
    center_lng = models.DecimalField(max_digits=9, decimal_places=6)

    boundary_left   = models.DecimalField(max_digits=9, decimal_places=6)
    boundary_right  = models.DecimalField(max_digits=9, decimal_places=6)
    boundary_top    = models.DecimalField(max_digits=9, decimal_places=6)
    boundary_bottom = models.DecimalField(max_digits=9, decimal_places=6)

class Rectangle(Shape):
    pass

class Polygon(Shape):
    pass

class Line(Shape):
    pass

class Circle(Shape):
    radius = models.FloatField()

class Marker(Shape):
    pass


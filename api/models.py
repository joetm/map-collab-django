from __future__ import unicode_literals

from django.db import models

from django.core.urlresolvers import reverse


class Shape(models.Model):

    # def __init__(self):
    #     shapeList = [(cls.__name__.lower(), cls.__name__) for cls in vars()['Shape'].__subclasses__()]
    #     self.shape_type = models.CharField(max_length=20, choices=shapeList)

    # id = models.AutoField(primary_key=True)

    _leaflet_id = models.PositiveIntegerField('_leaflet_id', primary_key=True)

    type = models.CharField('shape type', max_length=20)

    # slug = models.SlugField(max_length=50)

    created = models.DateTimeField('date created')
    updated = models.DateTimeField('last update')

    # leafletJSON = models.TextField() # stores the Leaflet feature as a JSON object

    # TODO: remove blank=True

    # center_lat = models.DecimalField(max_digits=16, decimal_places=13, blank=True)
    # center_lng = models.DecimalField(max_digits=16, decimal_places=13, blank=True)

    # boundary_left   = models.DecimalField(max_digits=9, decimal_places=6, blank=True)
    # boundary_right  = models.DecimalField(max_digits=9, decimal_places=6, blank=True)
    # boundary_top    = models.DecimalField(max_digits=9, decimal_places=6, blank=True)
    # boundary_bottom = models.DecimalField(max_digits=9, decimal_places=6, blank=True)

    encoded = models.CharField(max_length=250)
    options = models.TextField() # stores the Leaflet feature as a JSON object

    # for admin panel
    def __str__(self):
        return '%s %s' % (self.type, self.encoded)

    def get_absolute_url(self):
        return reverse('api.views.feature', args=[str(self._leaflet_id)])

    # https://docs.djangoproject.com/en/1.9/ref/models/options/
    def Meta():
        ordering = ["-created", "-_leaflet_id"]	# '-' => descending order
        verbose_name_plural = "shapes"
        # https://docs.djangoproject.com/en/1.9/topics/db/models/#abstract-base-classes
        # abstract = True


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



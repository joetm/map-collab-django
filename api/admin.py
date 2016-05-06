from django.contrib import admin

# Register your models here.

from .models import Shape #, Rectangle


# change the title in the header
from django.contrib.admin import AdminSite
AdminSite.site_header = 'Shape Administration'


class ShapeAdminConfig(admin.ModelAdmin):
    # prepopulated_fields = {"slug": ("center_lat","center_lng")}
    # fields = ['creation_date', 'center_lat', 'center_lng', 'leafletJSON']
    fieldsets = [
        ('Leaflet',          {'fields': ['_leaflet_id', 'type', 'leafletJSON']}),
        ('Geo',              {'fields': ['center_lat', 'center_lng', 'boundary_left', 'boundary_right', 'boundary_top', 'boundary_bottom']}),
        ('Date information', {'fields': ['creation_date']}),
    ]


admin.site.register(Shape, ShapeAdminConfig)
# admin.site.register(Rectangle, ShapeAdminConfig)


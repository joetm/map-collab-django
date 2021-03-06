# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-06 10:03
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Shape',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15)),
                ('creation_date', models.DateTimeField(verbose_name='date created')),
                ('leafletJSON', models.TextField()),
                ('center_lat', models.DecimalField(decimal_places=6, max_digits=9)),
                ('center_lng', models.DecimalField(decimal_places=6, max_digits=9)),
                ('boundary_left', models.DecimalField(decimal_places=6, max_digits=9)),
                ('boundary_right', models.DecimalField(decimal_places=6, max_digits=9)),
                ('boundary_top', models.DecimalField(decimal_places=6, max_digits=9)),
                ('boundary_bottom', models.DecimalField(decimal_places=6, max_digits=9)),
            ],
        ),
        migrations.CreateModel(
            name='Circle',
            fields=[
                ('shape_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.Shape')),
                ('radius', models.FloatField()),
            ],
            bases=('api.shape',),
        ),
        migrations.CreateModel(
            name='Line',
            fields=[
                ('shape_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.Shape')),
            ],
            bases=('api.shape',),
        ),
        migrations.CreateModel(
            name='Marker',
            fields=[
                ('shape_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.Shape')),
            ],
            bases=('api.shape',),
        ),
        migrations.CreateModel(
            name='Polygon',
            fields=[
                ('shape_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.Shape')),
            ],
            bases=('api.shape',),
        ),
        migrations.CreateModel(
            name='Rectangle',
            fields=[
                ('shape_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.Shape')),
            ],
            bases=('api.shape',),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-06 15:55
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20160506_1450'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shape',
            name='boundary_bottom',
        ),
        migrations.RemoveField(
            model_name='shape',
            name='boundary_left',
        ),
        migrations.RemoveField(
            model_name='shape',
            name='boundary_right',
        ),
        migrations.RemoveField(
            model_name='shape',
            name='boundary_top',
        ),
        migrations.RemoveField(
            model_name='shape',
            name='center_lat',
        ),
        migrations.RemoveField(
            model_name='shape',
            name='center_lng',
        ),
    ]

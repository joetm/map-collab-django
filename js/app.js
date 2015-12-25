/**************/
/* Map Collab */
/**************/

/*global console*/

define(["jquery", "backbone", "leaflet", "ldraw", "lencoded"], function($, Backbone, L) {

    //$.ajaxPrefilter(function( options ) {
    //    options.dataType = "json";
    //});

    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib}),
        map = new L.Map('map', {layers: [osm], center: new L.LatLng(51.505, -0.04), zoom: 13}),
        drawnItems = L.featureGroup().addTo(map),
        //Backbone
        Feature = Backbone.Model.extend({
            urlRoot : './api.php'
        }),
        Features = Backbone.Collection.extend({
            url: './api.php',
            model: Feature
        });

    function addToMap(g) {
        'use strict';
        //console.log('add event:', g);
        var encoded = g.get('geometry'),
            m,
            id = g.get('id'),
            type = g.get('type'),
            options = g.get('options');
        if (options) {
            options = JSON.parse(options);
        } else {
            options = {};
        }
        switch (type) {
        case 'circle':
            //fall through
        case 'marker':
            var p = L.Polygon.fromEncoded(encoded),
                latlng = p.getLatLngs()[0];
            if (type === 'circle') {
                //circle
                m = L.circle(latlng, options.radius); //.addTo(map);
            } else {
                //marker
                m = L.marker(latlng); //.addTo(map);
            }
            break;
        case 'polyline':
            m = L.Polyline.fromEncoded(encoded); //.addTo(map);
            break;
        case 'polygon':
            m = L.Polygon.fromEncoded(encoded); //.addTo(map);
            break;
        case 'rectangle':
            m = L.Polygon.fromEncoded(encoded); //.addTo(map);
            break;
        }
        //add geometry to map
        drawnItems.addLayer(m);
    }

    //populate map
    var geometries = new Features();
    geometries.on('add', addToMap);
    geometries.fetch();

    //map controls
    map.addControl(new L.Control.Draw({
        edit: {featureGroup: drawnItems}
    }));

    //map events
    map.on('draw:created', function (event) {
        'use strict';
        var layer = event.layer,
            type = event.layerType,
            model;
        console.log('created:', type, layer);
        switch (type) {
        case 'circle':
            //fall through
        case 'marker':
            var latlng = [layer._latlng.lat, layer._latlng.lng],
                encoded = L.PolylineUtil.encode([latlng]),
                f = {
                    type: type,
                    //latlng: layer._latlng,
                    //options: layer.options
                    //layer: layer
                    geometry: encoded
                };
            if (type == 'circle') {
                f.options = layer.options;
                f.options.radius = layer._mRadius;
                console.log('options', f.options)
            }
            model = new Feature(f);
            model.save();
            break;
        case 'polyline':
           //fall through
        case 'polygon':
           //fall through
        case 'rectangle':
            var encoded = layer.encodePath();
            model = new Feature({
                    type: type,
                    //latlngs: layer._latlngs,
                    //options: layer.options
                    //layer: layer
                    geometry: encoded
                });
            console.log(encoded);
            model.save();
            break;
        }
        //add geometry to map
        drawnItems.addLayer(layer);
    });

});

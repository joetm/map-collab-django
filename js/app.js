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
            urlRoot : './api.php',
            idAttribute: "_leaflet_id"
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
            options = g.get('options'),
            p,
            latlng;
        if (options) {
            options = JSON.parse(options);
        } else {
            options = {};
        }
        switch (type) {
        case 'circle':
            //fall through
        case 'marker':
            p = L.Polygon.fromEncoded(encoded),
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
            //fallthrough
        case 'rectangle':
            m = L.Polygon.fromEncoded(encoded); //.addTo(map);
            break;
        }

        //click event
        m.on('click', function(e) {
            console.log('click', e.target);
            //console.log('this', this);

        });

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

    function prepare_feature(layer, type) {
        var f,
            encoded;
        switch (type) {
        case 'circle':
            //fall through
        case 'marker':
            encoded = L.PolylineUtil.encode([ [layer._latlng.lat, layer._latlng.lng] ]);
            f = {
                type: type,
                options: layer.options,
                geometry: encoded
            };
            if (type == 'circle') {
                f.options = layer.options;
                f.options.radius = layer._mRadius;
                console.log('options', f.options)
            }
            break;
        case 'polyline':
           //fall through
        case 'polygon':
           //fall through
        case 'rectangle':
            encoded = layer.encodePath();
            f = {
                type: type,
                options: layer.options,
                geometry: encoded
            };
            break;
        }
        return f;
    }

    //map events
    map.on('draw:created', function (event) {
        'use strict';
        var layer = event.layer,
            type = event.layerType,
            f = prepare_feature(layer, type),
            //save
            model = new Feature(f);
        //Features.add(model);
        model.save();
        //add geometry to map
        drawnItems.addLayer(layer);
    });

    //map events
    map.on('draw:deleted', function (event) {
        'use strict';
        var layers = event.layers._layers,
            model,
            i = 0,
            f,
            id,
            s = layers.length;
        console.log('layers', layers)
        _.each(layers, function (item) {
            console.log('item', item);
            id = item._leaflet_id;
            //save
            console.log('delete id: ', id);
            //get the model
            model = Features.get(id);
            //delete
            model.destroy({success: function(m, res) {
                console.log('success', m, res);
            }});
        });
        //f = prepare_feature(event);
    });

});

/**************/
/* Map Collab */
/**************/

/*global console*/

// define(["jquery", "backbone", "leaflet", "ldraw", "lencoded", "lmarkercluster"], function($, Backbone, L) {

$(function() {

    // need to set Django's csrf token for Backbone
    var BbSync = Backbone.sync,
        CSRF_TOKEN = $('form#tokenform [name="csrfmiddlewaretoken"]').val();
    Backbone.sync = function(method, model, options){
        options.beforeSend = function(xhr){
            xhr.setRequestHeader('X-CSRFToken', CSRF_TOKEN);
        };
        return BbSync(method, model, options);
    };

    //$.ajaxPrefilter(function( options ) {
    //    options.dataType = "json";
    //});

    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, {maxZoom: 22, attribution: osmAttrib}),
        map = new L.Map('map', {layers: [osm], center: new L.LatLng(51.505, -0.04), zoom: 13}),
        dxmarkers,
        drawnItems = L.featureGroup().addTo(map),
        editGroup  = L.featureGroup(),
        //Backbone
        FModel = Backbone.Model.extend({
            urlRoot : '/api/features',
            idAttribute: "_leaflet_id"
        }),
        FModels = Backbone.Collection.extend({
            url: '/api/features',
            model: FModel
        }),
        //feature factory
        F = function F (type, latlngs, options) {
            switch (type) {
            case 'circle':
                radius = options.radius;
                layer = L.circle(latlngs[0], radius, options);
                break;
            case 'marker':
                layer = L.marker(latlngs[0], options);
                break;
            case 'polyline':
                layer = L.polyline(latlngs, options);
                break;
            case 'polygon':
                layer = L.polygon(latlngs, options);
                break;
            case 'rectangle':
                layer = L.rectangle(latlngs, options);
                break;
            }
            return layer;
        },
        progressBar = {
            '$wrapper': $('#progress'),
            '$bar': $('#progress .bar'),
            'status': 0,
            'max': 0,
            'update': function (num) {
                //console.log(num);
                if (this.max) {
                    this.status = (num/this.max * 100) + '%';
                    console.log(this.status);
                    this.$bar.text(this.status);
                    this.$bar.css('width', this.status);
                    //this.status = num;
                    //this.$el.text(this.status + ' / ' + progressBar.max);
                }
            }
        };



    //map controls
    map.addControl(new L.Control.Draw({
        edit: {featureGroup: editGroup}
    }));


    // var geojson;
    // function loadGeoJSON() {
    //     $.getJSON("./data/all.json", function(data) {

    //         var num = data.features.length;
    //         progressBar.max = num;

    //         //var i = 0;
    //         geojson = L.geoJson(data, {
    //             onEachFeature: function (feature, layer) {

    //                 //i = i + 1;
    //                 //need closure to make settimeout accept the parameter
    //                 //setTimeout(function (x) {progressBar.update(x);}(i), 10);

    //                 if (feature.properties.th_src && feature.properties.url) {
    //                     layer.bindPopup('<a href="' + feature.properties.url + '"><img src="' + feature.properties.th_src + '" width="' + feature.properties.th_w + '" height="' + feature.properties.th_h + '" alt="" /></a>');
    //                 }

    //             }
    //         });
    //         //1: this works and adds the markers:
    //         //geojson.addTo(map);
    //         dxmarkers = L.markerClusterGroup({
    //             spiderfyOnMaxZoom: false,
    //             showCoverageOnHover: false,
    //             zoomToBoundsOnClick: true,
    //             chunkedLoading: true,
    //             chunkProgress: progressBar.update
    //         });
    //         dxmarkers.addLayer(geojson);
    //         map.addLayer(dxmarkers);

    //     });
    // }
    // loadGeoJSON(); //load the markers from file



    function addToMap (g) {
        //console.log('g-add', g);
        var encoded = g.get('encoded'),
            type = g.get('type'),
            options = g.get('options'),
            //_leaflet_id = g.get('_leaflet_id'),
            f;
        options = JSON.parse(options);
        latlngs = L.PolylineUtil.decode(encoded);
        f = new F(type, latlngs, options);
        f.addTo(map);
        drawnItems.addLayer(f);
    }


    //populate map
    var geometries = new FModels();
    geometries.on('add', addToMap);
    geometries.fetch();


    drawnItems.on('click', function (layer) {
        editGroup.addLayer(layer);
    });
    map.on('draw:editstop', function (e) {
        //clear the edit group
        editGroup  = L.featureGroup([]);
    });


    map.on('draw:created', function (e) {

        var layer = e.layer,
            g,
            encoded,
            type = e.layerType,
            latlng,
            latlngs,
            radius = false,
            options = layer.options;

        switch (type) {
        case 'circle':
            options.radius = layer._mRadius;
            //fall through
        case 'marker':
            latlng = [layer._latlng.lat,layer._latlng.lng];
            latlngs = [latlng]
            break;
        case 'polyline':
            //fall through
        case 'polygon':
            latlngs = layer._latlngs;
            break;
        }

        encoded = L.PolylineUtil.encode(latlngs);

        console.log('type', type);
        console.log('encoded', encoded);
        console.log('layer', layer);

        map.addLayer(layer);

        g = new FModel({
            '_leaflet_id': layer._leaflet_id,
            'options':     options,
            'type':        type,
            'encoded':     encoded
        });

        if (radius) {
            g.set({'radius': radius});
        }

        //geometries.add(g);
        g.save();

    });


});

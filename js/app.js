/**************/
/* Map Collab */
/**************/

/*global L, Backbone, console*/

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

    console.log('add event:', g);

    var encoded = g.get('geometry');
    var id = g.get('id');

    switch (g.get('type')) {
    case 'marker':
        var m = L.Marker.fromEncoded(encoded).addTo(map);
        break;
    case 'polyline':
        var pl = L.Polyline.fromEncoded(encoded).addTo(map);
        break;
    case 'polygon':
        var pg = L.Polygon.fromEncoded(encoded).addTo(map);
        break;
    case 'circle':
        var ci = L.Polyline.fromEncoded(encoded).addTo(map);
        break;
    case 'rectangle':
        var rc = L.Polygon.fromEncoded(encoded).addTo(map);
        break;
    }

    var polyline = L.Polyline.fromEncoded(encoded).addTo(map);

}

var geometries = new Features();

geometries.on('add', addToMap);

//populate map
geometries.fetch();



map.addControl(new L.Control.Draw({
    edit: {featureGroup: drawnItems}
}));

map.on('draw:created', function (event) {
    'use strict';
    var layer = event.layer,
        type = event.layerType;

    layer = event.layer;

    console.log('created:', type, layer);

    switch (type) {
    case 'marker':
        var marker = new Feature({
                type: type,
                //latlng: layer._latlng,
                //options: layer.options
                layer: layer
            });
        marker.save();
        break;
    case 'polyline':
       //fall through
    case 'polygon':
       //fall through
    case 'circle':
       //fall through
    case 'rectangle':

        //polyline encoding with Leaflet plugin
        var encoded = layer.encodePath(),
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

    drawnItems.addLayer(layer);
});


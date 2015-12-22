var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});
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

map.addControl(new L.Control.Draw({
    edit: {featureGroup: drawnItems}
}));

map.on('draw:created', function(event) {
    var layer = event.layer,
        type = event.layerType;

    layer = event.layer;

    console.log(type, layer);

    switch (type) {
       case 'marker':
            var marker = new Feature({
                type: type,
                latlng: layer._latlng,
                options: layer.options
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
            var model = new Feature({
                type: type,
                latlngs: layer._latlngs,
                options: layer.options
            });
            model.save();
            break;
    }

    drawnItems.addLayer(layer);
});


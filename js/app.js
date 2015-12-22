var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});
    map = new L.Map('map', {layers: [osm], center: new L.LatLng(51.505, -0.04), zoom: 13}),
    drawnItems = L.featureGroup().addTo(map);

map.addControl(new L.Control.Draw({
    edit: { featureGroup: drawnItems }
}));

map.on('draw:created', function(event) {
    var layer = event.layer,
        type = event.layerType;

    layer = e.layer;

    if (type === 'marker') {
        // Do marker specific actions
    }

    drawnItems.addLayer(layer);
});

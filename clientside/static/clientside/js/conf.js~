// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({
    "baseUrl": "js/vendor",
    "paths": {
      "jquery": "jquery/jquery-2.1.4.min",
      "backbone": "backbone/backbone-min",
      "underscore": "backbone/underscore-min",
      "leaflet": "leaflet/leaflet",
      "ldraw": "leaflet/plugins/Leaflet.draw-0.2.4/leaflet.draw",
      "lencoded": "leaflet/plugins/Leaflet.encoded-0.0.7/Polyline.encoded",
      "lmarkercluster": "leaflet/plugins/Leaflet.markercluster-0.4.0-hotfix.1/dist/leaflet.markercluster"
    },
    "shim": {
        "backbone": ["underscore"],
        "ldraw":    ["leaflet"],
        "lencoded": ["leaflet"],
        "lmarkercluster": ["leaflet"]
    }
});

// Load the main app module to start the app
requirejs(["../app"]);
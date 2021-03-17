// function start_mapping(schoolJson,hospitalsJson){
//     console.log("school json:")
//     console.log(schoolJson)
//     console.log("Hospital clinics json:")
//     console.log(hospitalsJson)

//     var map = new mapboxgl.Map({
//         container: 'map', // container id
//         style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
//         center: [51.049999, -114.066666], // starting position
//         zoom: 12 // starting zoom
//       });
//     var hospitals_clinics=hospitalsJson;
//     var schools=schoolJson;


//     map.on('load', function () {
//         map.addLayer({
//           id: 'hospitals_clinics',
//           type: 'symbol',
//           source: {
//           type: 'geojson',
//           data: hospitals_clinics
//           },
//           layout: {
//           'icon-image': 'hospital-15',
//           'icon-allow-overlap': true
//           },
//           paint: {}
//         });

//     });



// }
document.addEventListener("DOMContentLoaded",()=>{
  mapboxgl.accessToken = "pk.eyJ1IjoiYWhtZWRzeWQiLCJhIjoiY2tsaWtvemlqMGE0czJ4cGxlaHMwZGUzNyJ9.ZqoUVoiuHS9LzOvahBnWKw"
  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
      center: [-114.066666, 51.049999], // starting position
      zoom: 12 // starting zoom
    });
  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());
  const request= new XMLHttpRequest();
  request.open("POST",'/nearest');
  //callback fucntion when request completes
  request.onload=()=>{
    data_json=JSON.parse(request.responseText);
    var schools=data_json["schools"];
    var hospitals_clinics=data_json["hospitals_clinics"];
    console.log(schools);
    console.log(hospitals_clinics);


    map.on('load', function () {
      map.addLayer({
        id: 'hospitals_clinics',
        type: 'symbol',
        source: {
        type: 'geojson',
        data: hospitals_clinics
        },
        layout: {
        'icon-image': 'hospital-15',
        'icon-allow-overlap': true
        },
        paint: {}
      });
       
      map.addLayer({
        id: 'schools',
        type: 'symbol',
        source: {
        type: 'geojson',
        data: schools
        },
        layout: {
        'icon-image': 'school-15',
        'icon-allow-overlap': true
        },
        paint: {}
      });
       
      map.addSource('nearest-hospital', {
        type: 'geojson',
        data: {
        'type': 'FeatureCollection',
        'features': []
        }
      });
    });

    var popup = new mapboxgl.Popup();
    map.on('mousemove', function(e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['hospitals_clinics', 'schools'] });
      if (!features.length) {
        popup.remove();
        return;
      }
      var feature = features[0];
    
      popup.setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.name)
        .addTo(map);
    
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });


    map.on('click', function (e) {
      var schoolFeatures = map.queryRenderedFeatures(e.point, {
        layers: ['schools']
      });
      if (!schoolFeatures.length) {
        return;
      }
      
      var schoolFeature = schoolFeatures[0];
      
      var nearestHospital = turf.nearest(schoolFeature, hospitals_clinics);
      
      if (nearestHospital != null) {
          map.getSource('nearest-hospital').setData({
            'type': 'FeatureCollection',
            'features': [nearestHospital]
          });
          
          map.addLayer(
          {
            id: 'nearest-hospital',
            type: 'circle',
            source: 'nearest-hospital',
            paint: {
              'circle-radius': 12,
              'circle-color': '#486DE0'
          }
          },
          'hospitals_clinics'
          );
      }
    });



  };

    //send the request to flask 
    request.send({"start":"Yes"});
});
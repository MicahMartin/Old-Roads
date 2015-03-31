$(document).ready(function() {

  var southWest = new L.LatLng(-85, 180);
  var northEast = new L.LatLng(85, -180);
  bounds = new L.LatLngBounds(southWest, northEast);
  var map = L.map('map').setView([0, 0], 5);


  L.tileLayer('img/worldmap/{z}/{x}/{y}.png', {
    minZoom: 3,
    maxZoom: 6,
    clipTiles: true,
    tms: true,
    crs: L.CRS.Simple,
    continuousWorld:'true',
  }).addTo(map);
  map.attributionControl.setPrefix('');
  map.setMaxBounds(bounds);

  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  var drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnItems
    }
  });
  map.addControl(drawControl);

  var shape_id_counter = 0;
  var content = '<input id="url" type="text"/><br/><input type="button" class="okBtn" value="Save"/>'


  map.on('draw:created', function (e) {
    shape_id_counter += 1;
    var type = e.layerType,
    layer = e.layer;

    layer.id = shape_id_counter;
    shape = layer.toGeoJSON();

    drawnItems.addLayer(layer);

    shape_for_db = JSON.stringify(shape);

    var latlng = [0,0];
    var popup = L.popup()
    .setLatLng(latlng)
    .setContent(content)
    .openOn(map);

    $('#map').on('click', '.okBtn', function() {
      var  url = $('#url').val();
      


    if (popup) {

       map.closePopup();
     }
    });

  });
  drawnItems.on('click',function(e){
    var layer = e.layer;
    // var parsedUrl = "https://www.youtube.com/embed/"+layer.url+"?autoplay=1";
    // $("#iframe").attr('src',);
    console.log(layer.id);
    console.log(layer);
  });

});


//
//   function onEachFeature(feature, layer) {
//     layer.on('click', function (e) {
//       $("#iframe").attr('src', feature.properties.src);
//     });
//     layer.bindPopup(feature.properties.track);
//     return false;
//   };
//
//   var areas = [{
//     "type": "Feature",
//     "properties": {"area": "Falador",
//     "src":"https://www.youtube.com/embed/k0wd7pAVR1M?autoplay=1",
//     "track":"Fanfare"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.5, 0],
//         [5.5, 13],
//         [-5.8, 13],
//         [-5.8, 0]
//       ]]
//     }
//   }, {
//     "type": "Feature",
//     "properties": {"area": "East Falador",
//     "src":"https://www.youtube.com/embed/t1M6KsUY3o8?autoplay=1",
//     "track":"Workshop"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.6,0],
//         [5.6,13],
//         [17.2,13],
//         [17.2,0]
//       ]]
//     }
//   }, {
//     "type": "Feature",
//     "properties": {"area": "Draynor",
//     "src":"https://www.youtube.com/embed/XFFoi_ghkeU?autoplay=1",
//     "track":"Spooky"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [17.3,0],
//         [17.3,13],
//         [29,13],
//         [29,0]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "River Lum",
//     "src":"https://www.youtube.com/embed/YdA-OcRX1Xw?autoplay=1",
//     "track":"Greatness"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [29.1,0],
//         [29.1,13],
//         [41,13],
//         [41,0]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Warriors Guild",
//     "src":"https://www.youtube.com/embed/0gt-mK_ZV0o?autoplay=1",
//     "track":"Expanse"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [41.1,0],
//         [41.1,13],
//         [53.1,13],
//         [53.1,0]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Southeast Varrock",
//     "src":"https://www.youtube.com/embed/XVjbGvHN-IY?autoplay=1",
//     "track":"Still Night"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [53.2,0],
//         [53.2,13],
//         [65.2,13],
//         [65.2,0]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Lumbridge",
//     "src":"https://www.youtube.com/embed/JkR7zClEkAo?autoplay=1",
//     "track":"Harmony"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [41.1,-13.1],
//         [41.1,-25],
//         [53.1,-25],
//         [53.1,-13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Cows / chickens",
//     "src":"https://www.youtube.com/embed/I4M4XTsx2cA?autoplay=1",
//     "track":"Autumn Voyage"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [41.1,-.1],
//         [41.1,-13],
//         [53.1,-13],
//         [53.1,-.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Draynor Route",
//     "src":"https://www.youtube.com/embed/LFgvAyJWkjU?autoplay=1",
//     "track":"Flute Salad"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [29,-.1],
//         [29,-13],
//         [41,-13],
//         [41,-.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "North Draynor",
//     "src":"https://www.youtube.com/embed/5HJCYgDnfGY?autoplay=1",
//     "track":"Start"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [17,-.1],
//         [17,-13],
//         [28.9,-13],
//         [28.9,-.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Road To Fally",
//     "src":"https://www.youtube.com/embed/arEOmQ_JpAw?autoplay=1",
//     "track":"Wander"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.51,-.1],
//         [5.51,-13],
//         [16.9,-13],
//         [16.9,-.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "South Draynor",
//     "src":"https://www.youtube.com/embed/q4a0Dj4M66c?autoplay=1",
//     "track":"Unkown Land"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [17,-13.1],
//         [17,-25],
//         [29,-25],
//         [29,-13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Draynor Prison",
//     "src":"https://www.youtube.com/embed/Np-lV0sl9Fw?autoplay=1",
//     "track":"Dream"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [29.1,-13.1],
//         [29.1,-25],
//         [41,-25],
//         [41,-13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Port Sarim",
//     "src":"https://www.youtube.com/embed/-ElGfxTpVXU?autoplay=1",
//     "track":"Sea Shanty 2"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.51,-13.1],
//         [5.51,-25],
//         [16.9,-25],
//         [16.9,-13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Port Sarim Goblin Area",
//     "src":"https://www.youtube.com/embed/8tSfgO3AbwE?autoplay=1",
//     "track":"Tommorow"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.51,-25.1],
//         [5.51,-36],
//         [16.9,-36],
//         [16.9,-25.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Tutorial Island",
//     "src":"https://www.youtube.com/embed/VNW9TAwImBY?autoplay=1",
//     "track":"Newbie Melody.. T.T the Nostalgia.."},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//
//         [5.51,-36],
//         [5.51,-47],
//         [41,-47],
//         [41,-36]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Wizard's Tower",
//     "src":"https://www.youtube.com/embed/2T6Le21bzBU?autoplay=1",
//     "track":"Vision"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [17,-25.1],
//         [17,-36],
//         [29,-36],
//         [29,-25.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "East Lumbridge Swamp",
//     "src":"https://www.youtube.com/embed/Dwa-81884m8?autoplay=1",
//     "track":"Book of Spells"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [29,-25.1],
//         [29,-36],
//         [41,-36],
//         [41,-25.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "West Lumbridge Swamp",
//     "src":"https://www.youtube.com/embed/FMNAcMNedOc?autoplay=1",
//     "track":"Yesteryear"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [41,-25.1],
//         [41,-36],
//         [52,-36],
//         [52,-25.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Al Kharid",
//     "src":"https://www.youtube.com/embed/q4D0InGS0DU?autoplay=1",
//     "track":"Al Kharid"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [52,-25.1],
//         [52,-36],
//         [75.5,-36],
//         [75.5,-25.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Rimmington",
//     "src":"https://www.youtube.com/embed/oLphMRy6lsQ?autoplay=1",
//     "track":"Long Way Home"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.5,-13.1],
//         [5.5,-25],
//         [-5.8,-25],
//         [-5.8,-13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Port Sarim Fishing Area",
//     "src":"https://www.youtube.com/embed/nJWYLgOubhw?autoplay=1",
//     "track":"Attention"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.5,-25.1],
//         [5.5,-36],
//         [-5.8,-36],
//         [-5.8,-25.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "MudSkipper Dungeon",
//     "src":"https://www.youtube.com/embed/K8gYcdFts00?autoplay=1",
//     "track":"Mud Skipper Melody"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.5,-36],
//         [5.5,-46],
//         [-5.8,-46],
//         [-5.8,-36]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Musa Point",
//     "src":"https://www.youtube.com/embed/ykZey21sYds?autoplay=1",
//     "track":"Sea Shanty"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [-5.7,-25.1],
//         [-5.7,-36],
//         [-17.7,-36],
//         [-17.7,-25.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Melzar's Maze",
//     "src":"https://www.youtube.com/embed/KhreN5xyjkA?autoplay=1",
//     "track":"Emperor"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [-5.7,-13.1],
//         [-5.7,-25],
//         [-17.7,-25],
//         [-17.7,-13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "South Fally Entrance",
//     "src":"https://www.youtube.com/embed/VW6EudU6Lb0?autoplay=1",
//     "track":"Nightfall"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.5,-.1],
//         [5.5,-13],
//         [-5.8,-13],
//         [-5.8,-.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Crafting Guild",
//     "src":"https://www.youtube.com/embed/eRAEpWP7Rm8?autoplay=1",
//     "track":"Miles Away"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [-5.7,-.1],
//         [-5.7,-13],
//         [-17.7,-13],
//         [-17.7,-.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Goblin Village",
//     "src":"https://www.youtube.com/embed/QjUT86N7ffU?autoplay=1",
//     "track":"Gnome"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.5,24.9],
//         [5.5,36],
//         [-5.8,36],
//         [-5.8,24.9]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Wildy1",
//     "src":"https://www.youtube.com/embed/pV1d2nxaqzo?autoplay=1",
//     "track":"Wonder"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.5,36.1],
//         [5.5,46],
//         [-5.8,46],
//         [-5.8,36.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Wildy2",
//     "src":"https://www.youtube.com/embed/nAZNr1_ov2s?autoplay=1",
//     "track":"Inspiration"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.5,36.1],
//         [5.5,46],
//         [17,46],
//         [17,36.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Wildy3",
//     "src":"https://www.youtube.com/embed/xayre9UUY-g?autoplay=1",
//     "track":"Dangerous"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [17.1,36.1],
//         [17.1,46],
//         [29,46],
//         [29,36.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Wildy4",
//     "src":"https://www.youtube.com/embed/_pzIScxsyIk?autoplay=1",
//     "track":"Lightness"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [29.1,36.1],
//         [29.1,46],
//         [41,46],
//         [41,36.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Wildy5",
//     "src":"https://www.youtube.com/embed/cwY4dsU3nlI?autoplay=1",
//     "track":"Crystal Sword"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [41.1,36.1],
//         [41.1,46],
//         [53,46],
//         [53,36.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Wildy6",
//     "src":"https://www.youtube.com/embed/ihMBAZEf4Bg?autoplay=1",
//     "track":"Forbidden"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [53.1,36.1],
//         [53.1,46],
//         [77,46],
//         [77,36.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Slayer Tower",
//     "src":"https://www.youtube.com/embed/v81hpAdNhnE?autoplay=1",
//     "track":"The Terrible Tower"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [77.1,36.1],
//         [77.1,46],
//         [87,46],
//         [87,36.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Fekenstein's Castle",
//     "src":"https://www.youtube.com/embed/A2FkJMBou6M?autoplay=1",
//     "track":"Fekenstrain's Refrain"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [87.1,36.1],
//         [87.1,46],
//         [110,46],
//         [110,36.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Monastary",
//     "src":"https://www.youtube.com/embed/Xxsi-YbbavA?autoplay=1",
//     "track":"Alone"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.5,24.9],
//         [5.5,36],
//         [17,36],
//         [17,24.9]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Edgeville",
//     "src":"https://www.youtube.com/embed/HGgIhyQTHS8?autoplay=1",
//     "track":"Forever"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [17.1,24.9],
//         [17.1,36],
//         [29,36],
//         [29,24.9]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Grand Exchange",
//     "src":"https://www.youtube.com/embed/s0Nvw3i-aCo?autoplay=1",
//     "track":"Grand Exchange"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [29.1,24.9],
//         [29.1,36],
//         [40,36],
//         [40,24.9]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "North East Varrock",
//     "src":"https://www.youtube.com/embed/Z2Oci7962pI?autoplay=1",
//     "track":"Adventure ... WILDY TIME BABY!"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [40.1,24.9],
//         [40.1,36],
//         [53,36],
//         [53,24.9]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Lumber Yard",
//     "src":"https://www.youtube.com/embed/4GdGJz3Wk24?autoplay=1",
//     "track":"Parade"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [53.1,24.9],
//         [53.1,36],
//         [77,36],
//         [77,24.9]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Morty",
//     "src":"https://www.youtube.com/embed/_APNhNUt-J0?autoplay=1",
//     "track":"Morytania"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [77.1,24.9],
//         [77.1,36],
//         [87,36],
//         [87,24.9]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Canifis",
//     "src":"https://www.youtube.com/embed/j8AKZEY5rls?autoplay=1",
//     "track":"Village"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [87.1,24.9],
//         [87.1,36],
//         [99,36],
//         [99,24.9]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "North Fally Entrance",
//     "src":"https://www.youtube.com/embed/HJLE4so-Lyw?autoplay=1",
//     "track":"Scape Soft"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.5,13.1],
//         [5.5,24.8],
//         [-5.8,24.8],
//         [-5.8,13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Pathway",
//     "src":"https://www.youtube.com/embed/8M7pL6ucR9A?autoplay=1",
//     "track":"Gnome Theme"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [5.5,13.1],
//         [5.5,24.8],
//         [17.4,24.8],
//         [17.4,13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Barbarian Village",
//     "src":"https://www.youtube.com/embed/GJepHpmbjGM?autoplay=1",
//     "track":"Barbarianism"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [17.5,13.1],
//         [17.5,24.8],
//         [29.4,24.8],
//         [29.4,13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "East Varrock",
//     "src":"https://www.youtube.com/embed/cZPE-45HJIQ?autoplay=1",
//     "track":"Spirit"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [29.5,13.1],
//         [29.5,24.8],
//         [41,24.8],
//         [41,13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Varrock",
//     "src":"https://www.youtube.com/embed/WtBigNNwcmo?autoplay=1",
//     "track":"Garden"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [41.1,13.1],
//         [41.1,24.8],
//         [53,24.8],
//         [53,13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "West Varrock",
//     "src":"https://www.youtube.com/embed/QSkvyG3H_KM?autoplay=1",
//     "track":"Medieval"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [53.1,13.1],
//         [53.1,24.8],
//         [64,24.8],
//         [64,13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Dig Site",
//     "src":"https://www.youtube.com/embed/xB3Ut3IGqcM?autoplay=1",
//     "track":"Lullaby"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [64.1,13.1],
//         [64.1,24.8],
//         [74,24.8],
//         [74,13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "River Salute",
//     "src":"https://www.youtube.com/embed/pn3Gl8FXmnM?autoplay=1",
//     "track":"Dead Quiet"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [74.1,13.1],
//         [74.1,24.8],
//         [89.4,24.8],
//         [89.4,13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Toll Gate",
//     "src":"https://www.youtube.com/embed/Rptxw5O-nww?autoplay=1",
//     "track":"Arabian"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [53.2,-13.1],
//         [53.2,-25],
//         [63.8,-25],
//         [63.8,-13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Al Kaharid Mines",
//     "src":"https://www.youtube.com/embed/EuVjHD5iYaQ?autoplay=1",
//     "track":"Arabian 2"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [53.2,-.1],
//         [53.2,-13],
//         [65.2,-13],
//         [65.2,-.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Duel Area",
//     "src":"https://www.youtube.com/embed/5d4hNLA1fZM?autoplay=1",
//     "track":"Shine"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [65.3,-.1],
//         [65.3,-13],
//         [77.3,-13],
//         [77.3,-.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Duel Arena",
//     "src":"https://www.youtube.com/embed/6zZtUybqUZY?autoplay=1",
//     "track":"Duel Arena"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [64.3,-13.1],
//         [64.3,-25],
//         [75.5,-25],
//         [75.5,-13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Northeast Lumbridge",
//     "src":"https://www.youtube.com/embed/bjxK0GQeA-c?autoplay=1",
//     "track":"Venture"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [65.3,0],
//         [65.3,13],
//         [77.3,13],
//         [77.3,0]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Mort Myre Swamp",
//     "src":"https://www.youtube.com/embed/YhXTer8_dsg?autoplay=1",
//     "track":"Natural"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [77.4,0],
//         [77.4,13],
//         [89.4,13],
//         [89.4,0]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "The Hollows",
//     "src":"https://www.youtube.com/embed/DQqrabx4Lto?autoplay=1",
//     "track":"Stagnant"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [89.5,0],
//         [89.5,13],
//         [99.5,13],
//         [99.5,0]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "West Mortania",
//     "src":"https://www.youtube.com/embed/IxU9CKBSvU4?autoplay=1",
//     "track":"Waterlogged"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [89.5,13.1],
//         [89.5,24.8],
//         [110,24.8],
//         [110,13.1]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Haunted Woods",
//     "src":"https://www.youtube.com/embed/giAqP8Pp8A0?autoplay=1",
//     "track":"Deadlands"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [99.5,24.9],
//         [99.5,36],
//         [122,36],
//         [122,24.9]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Port Phasmatys",
//     "src":"https://www.youtube.com/embed/Q-xJEmwrahE?autoplay=1",
//     "track":"The Other Side"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [122.1,24.9],
//         [122.1,40],
//         [134,40],
//         [134,24.9]
//       ]]
//     }
//   },{
//     "type": "Feature",
//     "properties": {"area": "Shipwreck",
//     "src":"https://www.youtube.com/embed/wc7BDu1_ZyQ?autoplay=1",
//     "track":"Shipwreckk"},
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [[
//         [110.1,40],
//         [110.1,36.1],
//         [122,36.1],
//         [122,40]
//       ]]
//     }
//   }
//
//
// ];
//
// L.geoJson(areas, {
//   style:{color: "#ff0000"},
//   clickable: true,
//   onEachFeature: onEachFeature
// }).addTo(map);
// });

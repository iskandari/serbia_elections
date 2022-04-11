// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com               
	mapboxgl.accessToken = 'pk.eyJ1IjoibHVqamFzIiwiYSI6ImNsMWQ1N3RsejA2dzkzY24zbHQ4dGw1ajYifQ.ulknGr0riUdl_pWi6gp5Vw';
    const map = new mapboxgl.Map({
        container: 'map',
        //style: 'mapbox://styles/mapbox/light-v10',
        style: 'mapbox://styles/lujjas/cl1tlpjhr001914mq24rocupt',
        center: [21.28884578494251, 44.40321174690649],
        minZoom: 3,
        zoom: 5,
        maxBounds: [[4.488639533775682,38.18743500413535],[38.03525851035914,48.21372525778102]]
    });
        // Add the control to the map.
    map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        countries: 'rs',
        placeholder: 'Пронађи насеље'
        })
    );
        // disable map rotation using right click + drag
    map.dragRotate.disable();
    
    // disable map rotation using touch rotation gesture
    map.touchZoomRotate.disableRotation();
    const zoomThreshold = 10;
    const zoomThreshold2 = 9;
    const zoomThreshold3 = 6.5
    const zoomThreshold4 = 5.5;


    map.on('load', () => {
        

        map.addSource('admin1', {
            'type': 'geojson',
            'data': 'Okrug_merged.geojson'
        });

        map.addSource('admin0', {
            'type': 'geojson',
            'data': "Republika_merged.geojson"

        });

        map.addSource('admin01', {
            'type': 'geojson',
            'data': "Pokrajina_merged.geojson"
        });
       
        map.addLayer({
            'id': 'republika-legend',
            'type': 'fill',
            'maxzoom': zoomThreshold4,
            'source': 'admin0', // reference the data source
            'layout': {},
            'paint': {
                'fill-color': [
                'interpolate',
                ['linear'],
                ['coalesce', ['get', 'Гласали _sum'],0],
                0,
                //'#F2F12D',
                '#FFFFFF',
                100,
                '#EED322',
                1000,
                '#E6B71E',
                5000,
                '#DA9C20',
                10000,
                '#CA8323',
                50000,
                '#B86B25',
                100000,
                '#A25626',
                500000,
                '#8B4225',
                1000000,
                '#723122'
                ],
                'fill-opacity': 0.9
                }
        });

        map.addLayer({
            'id': 'pokrajina-legend',
            'type': 'fill',
            'minzoom': zoomThreshold4,
            'maxzoom': zoomThreshold3,
            'source': 'admin01', // reference the data source
            'layout': {},
            'paint': {
                'fill-color': [
                'interpolate',
                ['linear'],
                ['coalesce', ['get', 'Гласали _sum'],0],
                0,
                //'#F2F12D',
                '#FFFFFF',
                100,
                '#EED322',
                1000,
                '#E6B71E',
                5000,
                '#DA9C20',
                10000,
                '#CA8323',
                50000,
                '#B86B25',
                100000,
                '#A25626',
                500000,
                '#8B4225',
                1000000,
                '#723122'
                ],
                'fill-opacity': 0.9
                }
        });

        map.addLayer({
            'id': 'okrug-legend',
            'type': 'fill',
            'minzoom': zoomThreshold3,
            'maxzoom': zoomThreshold2,
            'source': 'admin1', // reference the data source
            'layout': {},
            'paint': {
                'fill-color': [
                'interpolate',
                ['linear'],
                ['coalesce', ['get', 'Гласали _sum'],0],
                0,
                //'#F2F12D',
                '#FFFFFF',
                100,
                '#EED322',
                1000,
                '#E6B71E',
                5000,
                '#DA9C20',
                10000,
                '#CA8323',
                20000,
                '#B86B25',
                50000,
                '#A25626',
                100000,
                '#8B4225',
                200000,
                '#723122'
                ],
                'fill-opacity': 0.9
                }
        });

        map.on('click', 'opstina-srbija', (e) => {
         map.getCanvas().style.cursor = 'pointer';
         popup.setLngLat(e.lngLat);
         let name = e.features[0].properties["opstina_ime"];
        popup.setHTML(createHtml(e,name));
         popup.addTo(map);
        });
        map.on('click', 'okrug-legend', (e) => {
         map.getCanvas().style.cursor = 'pointer';
         popup.setLngLat(e.lngLat);
         let name = e.features[0].properties["okrug_ime"];
         popup.setHTML(createHtml(e,name));
         popup.addTo(map);
        });

        map.on('click', 'republika-legend', (e) => {
         map.getCanvas().style.cursor = 'pointer';
         popup.setLngLat(e.lngLat);
         let name = e.features[0].properties["republika_ime"];
         popup.setHTML(createHtml(e,name));
         popup.addTo(map);
        });

        map.on('click', 'pokrajina-legend', (e) => {
         map.getCanvas().style.cursor = 'pointer';
         popup.setLngLat(e.lngLat);
         let name = e.features[0].properties["rap_ime"];
         popup.setHTML(createHtml(e,name));
         popup.addTo(map);
        });
         
        map.on('click', 'naselja-srbija', (e) => {
         map.getCanvas().style.cursor = 'pointer';
         popup.setLngLat(e.lngLat);
         let name = e.features[0].properties["naselje_ime"];
         popup.setHTML(createHtml(e,name));
         popup.addTo(map);
        }); 


         map.on('mouseleave', 'naselja-srbija', () => {
         map.getCanvas().style.cursor = '';
        }); 
        map.on('mouseleave', 'opstina-srbija', () => {
         map.getCanvas().style.cursor = '';
        });
        map.on('mouseleave', 'republika-legend', () => {
         map.getCanvas().style.cursor = '';
        });
        map.on('mouseleave', 'okrug-legend', () => {
         map.getCanvas().style.cursor = '';
        });

        map.on('mouseleave', 'pokrajina-legend', () => {
         map.getCanvas().style.cursor = '';
        });
   
    });

const republikaLegendEl = document.getElementById('republika-legend');
const okrugLegendEl = document.getElementById('okrug-legend');
const naseljaLegendEl = document.getElementById('naselja-legend');

map.on('zoom', () => {
    if (map.getZoom() > zoomThreshold) {
        republikaLegendEl.style.display = 'none';
        okrugLegendEl.style.display = 'none';
        naseljaLegendEl.style.display = 'block';
    } else if(map.getZoom() > zoomThreshold3){
        republikaLegendEl.style.display = 'none';
        okrugLegendEl.style.display = 'block';
        naseljaLegendEl.style.display = 'none';
    } else if(map.getZoom() > zoomThreshold4){
        republikaLegendEl.style.display = 'block';
        okrugLegendEl.style.display = 'none';
        naseljaLegendEl.style.display = 'none';
    } 
});


// Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false
    });

function createHtml(e,name){
    let vucic = e.features[0].properties["АЛЕКСАНДАР ВУЧИЋ - СРБИЈА ПОБЕЂУЈЕ_sum"];
    let pravedna = e.features[0].properties["ЗА ПРАВЕДНУ СРБИЈУ - ДЕМОКРАТСКА СТРАНКА (НОВА, ДСХВ, ЗЗС)_sum"];
    let dacic = e.features[0].properties["ИВИЦА ДАЧИЋ -\"Социјалистичка партија Србије (СПС), Јединствена Србија (ЈС) - Драган Марковић Палма\"_sum"];
    let seselj = e.features[0].properties["Др ВОЈИСЛАВ ШЕШЕЉ - СРПСКА РАДИКАЛНА СТРАНКА_sum"];
    let dveri = e.features[0].properties["ДВЕРИ - ДЕМОКРАТСКА СТРАНКА СРБИЈЕ - САНДА РАШКОВИЋ ИВИЋ - БОШКО ОБРАДОВИЋ_sum"];
    let pastor = e.features[0].properties["Vajdasági Magyar Szövetség-Pásztor István - Савез војвођанских Мађара-Иштван Пастор _sum"];
    let tadic = e.features[0].properties[" \nБОРИС ТАДИЋ, ЧЕДОМИР ЈОВАНОВИЋ - САВЕЗ ЗА БОЉУ СРБИЈУ - Либерално демократска партија, Лига социјалдемократа Војводине, Социјалдемократска странка \n _sum"];
    let zukorlic = e.features[0].properties["  МУАМЕР ЗУКОРЛИЋ / MUAMER ZUKORLIĆ - БОШЊАЧКА ДЕМОКРАТСКА ЗАЈЕДНИЦА САНЏАКА / BOŠNJAČKA DEMOKRATSKA ZAJEDNICA SANDŽAKA\n  _sum"];
    let ugljanin = e.features[0].properties[" \n SDA Sandžaka – Dr. Sulejman Ugljanin СДА Санџака – Др Сулејман Угљанин\n _sum"];
    let zavetnici = e.features[0].properties[" \nЗа слободну Србију – ЗАВЕТНИЦИ – Милица Ђурђевић\n _sum"];
    let djb = e.features[0].properties["ДОСТА ЈЕ БИЛО – САША РАДУЛОВИЋ_sum"];
    let inat = e.features[0].properties["У ИНАТ – СЛОЖНО ЗА СРБИЈУ – НАРОДНИ САВЕЗ _sum"];
    let upisani = e.features[0].properties["Уписани бирачи _sum"];
    let izasli = e.features[0].properties["Гласали _sum"];
    let html = "<strong>" + name + "</strong> изашлиx " + Math.round(izasli/upisani*100) +" %<br>" +
    "<table><th></th><th>oд изашлиx</th><th>од уписаних</th>"+
        "<tr><td>A. ВУЧИЋ</td><td>" + Math.round(vucic/izasli*100) + "%</td><td>" + Math.round(vucic/upisani*100) + "%</td></tr>"+
        "<tr><td>ДС, НОВА, ЗЗС</td><td>" + Math.round(pravedna/izasli*100) + "%</td><td>" + Math.round(pravedna/upisani*100) + "%</td></tr>"+
        "<tr><td>СПС, JC</td><td>" + Math.round(dacic/izasli*100) + "%</td><td>" + Math.round(dacic/upisani*100) + "%</td></tr>"+
        "<tr><td>CPC</td><td>" + Math.round(seselj/izasli*100) + "%</td><td>" + Math.round(seselj/upisani*100) + "%</td></tr>"+
        "<tr><td>ДВЕРИ, ДСC</td><td>" + Math.round(dveri/izasli*100) + "%</td><td>" + Math.round(dveri/upisani*100) + "%</td></tr>"+
        "<tr><td>ДЈБ</td><td>" + Math.round(djb/izasli*100) + "%</td><td>" + Math.round(djb/upisani*100) + "%</td></tr>"+
        "<tr><td>ЗАВЕТНИЦИ</td><td>" + Math.round(zavetnici/izasli*100) + "%</td><td>" + Math.round(zavetnici/upisani*100) + "%</td></tr>"+
        "<tr><td>И. Пастор</td><td>" + Math.round(pastor/izasli*100) + "%</td><td>" + Math.round(pastor/upisani*100) + "%</td></tr>"+
        "<tr><td>LDP, LSV, SDS</td><td>" + Math.round(tadic/izasli*100) + "%</td><td>" + Math.round(tadic/upisani*100) + "%</td></tr>"+
        "<tr><td>M. ЗУКОРЛИЋ</td><td>" + Math.round(zukorlic/izasli*100) + "%</td><td>" + Math.round(zukorlic/upisani*100) + "%</td></tr>"+
        "<tr><td>SDA Sandžaka</td><td>" + Math.round(ugljanin/izasli*100) + "%</td><td>" + Math.round(ugljanin/upisani*100) + "%</td></tr>"+
    "</table>";
    return html;
} 

var zoomToFeat = function(feature, map) {
    // based on this: https://www.mapbox.com/mapbox-gl-js/example/zoomto-linestring/

    // Geographic coordinates of the LineString
    var coordinates = feature.geometry.coordinates;

    // Pass the first coordinates in the LineString to `lngLatBounds` &
    // wrap each coordinate pair in `extend` to include them in the bounds
    // result. A variation of this technique could be applied to zooming
    // to the bounds of multiple Points or Polygon geomteries - it just
    // requires wrapping all the coordinates with the extend method.
    var bounds = coordinates.reduce(function(bounds, coord) {
        return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    map.fitBounds(bounds, {
        padding: 20
    });
};
import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../../../../../services/Firebase/tracking.service';
import { TrackingI } from './tracking.interface';
import { environment } from '../../../../../environments/environment';

// mapbox
import * as mapboxgl from 'mapbox-gl';
import { TrackingData, TrackingGeometry } from '../../../../../models/tracking.interface';
// const mapboxgl = require('mapbox-gl');
@Component({
    selector: 'tracking',
    templateUrl: './tracking.component.html',
    styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
    positions: TrackingI[];
    mapa: mapboxgl.Map;
    marker: any;
    json: any;
    source: mapboxgl.GeoJSONSource;
    resultado: TrackingGeometry;
    route: TrackingData;
    ruta = [
        [-122.48369693756104, 37.83381888486939],
        [-122.48348236083984, 37.83317489144141],
        [-122.48339653015138, 37.83270036637107],
        [-122.48356819152832, 37.832056363179625],
        [-122.48404026031496, 37.83114119107971],
        [-122.48404026031496, 37.83049717427869],
        [-122.48348236083984, 37.829920943955045],
        [-122.48356819152832, 37.82954808664175],
        [-122.48507022857666, 37.82944639795659],
        [-122.48610019683838, 37.82880236636284],
        [-122.48695850372314, 37.82931081282506],
        [-122.48700141906738, 37.83080223556934],
        [-122.48751640319824, 37.83168351665737],
        [-122.48803138732912, 37.832158048267786],
        [-122.48888969421387, 37.83297152392784],
        [-122.48987674713133, 37.83263257682617],
        [-122.49043464660643, 37.832937629287755],
        [-122.49125003814696, 37.832429207817725],
        [-122.49163627624512, 37.832564787218985],
        [-122.49223709106445, 37.83337825839438],
        [-122.49378204345702, 37.83368330777276]
    ];
    constructor(private trackingService: TrackingService) {
        console.log('El tracking se cargo correctamente');
    }

    ngOnInit() {
        this.trackingService.getAll().subscribe((res) => {
            this.positions = res;
            console.log(res);
        });
        this.loginTracking();
        Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapboxKey);
    }
    loginTracking() {
        // mapboxgl.accessToken = environment.mapboxKey;
        this.mapa = new mapboxgl.Map({
            accessToken: environment.mapboxKey,
            container: 'mapa-mapbox', // container id
            style: 'mapbox://styles/mapbox/streets-v11',
            // center: [-68.1823999, -16.4938747], // starting position
            center: [-122.48695850372314, 37.82931081282506], // starting position
            zoom: 15 // starting zoom
        });
        this.mapa.addControl(new mapboxgl.ScaleControl({ maxWidth: 100 }), 'bottom-left');
    }
    eliminarPosition(id: string) {
        this.trackingService.removeById(id);
        this.marker.remove();
    }
    // Mapbox
    crearMarcador(lng: number, lat: number) {
        this.marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.mapa);
    }
    recorrido() {
        console.log('recorrido clicked');
        this.mapa.addSource('route', {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: this.ruta
                }
            }
        });
        this.mapa.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#888',
                'line-width': 8
            }
        });
    }
    seguimiento() {
        // this.loginTracking();
        // this.mapa.on('load', () => {
        window.setInterval(async () => {
            this.source = this.mapa.getSource('drone') as mapboxgl.GeoJSONSource;
            await fetch(environment.flespiUrl)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.source.type = 'geojson';
                    this.source.setData(data);
                    this.mapa.flyTo({
                        center: data.geometry.coordinates,
                        speed: 0.5,
                        zoom: 6
                    });
                    this.resultado = data.geometry;
                    console.log('[Coordenadas: ]', this.resultado.coordinates);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 3000);
        this.mapa.addSource('drone', { type: 'geojson', data: environment.flespiUrl });
        this.mapa.addLayer({
            id: 'drone',
            type: 'symbol',
            source: 'drone',
            layout: {
                'icon-image': 'airfield-15'
            }
        });
        // });
    }
    // {"geometry": {"type": "Point", "coordinates": [114.478476902479, -8.24587410627298]}, "type": "Feature", "properties": {}}
    datosFalsos(long, lat) {
        const cordenadasFake = [0, 0];
        const coord: TrackingGeometry = {
            type: '',
            coordinates: []
        };
        this.route.type = 'Feature';
        this.route.properties = {};
        coord.type = 'Point';
        cordenadasFake[0] = long;
        cordenadasFake[1] = lat;
        coord.coordinates = cordenadasFake;
        this.route.geometry = coord;
    }
    generaFalso() {
        let lat = -68.1823999;
        let long = -16.4938747;
        setTimeout(() => {
            for (let i = 0; i < 20; i++) {
                this.datosFalsos(lat, long);
                long += 0.0000001;
                lat += 0.0000001;
            }
        }, 3000);
    }
    seguimientoFake() {
        window.setInterval(async () => {
            this.source = this.mapa.getSource('drone') as mapboxgl.GeoJSONSource;
            await fetch(environment.flespiUrl2, {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'FlespiToken TpNCwGPMMXiStVpRg7jDelJOjHP5aNsR16jnCWYdH4TYQ8GW3Pp5YWH6ukZsYi9P'
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.source.type = 'geojson';
                    this.source.setData(data);
                    this.mapa.flyTo({
                        center: data.geometry.coordinates,
                        speed: 0.5,
                        zoom: 6
                    });
                    this.resultado = data.geometry;
                    console.log('[Coordenadas: ]', this.resultado.coordinates);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 3000);
        this.mapa.addSource('drone', { type: 'geojson', data: environment.flespiUrl2 });
        this.mapa.addLayer({
            id: 'drone',
            type: 'symbol',
            source: 'drone',
            layout: {
                'icon-image': 'airfield-15'
            }
        });
    }
}

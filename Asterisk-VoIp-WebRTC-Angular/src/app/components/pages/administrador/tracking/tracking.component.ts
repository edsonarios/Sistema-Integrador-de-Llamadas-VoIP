import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../../../../../services/Firebase/tracking.service';
import { TrackingI, GeoResultado, Geometry } from './tracking.interface';
import { environment } from '../../../../../environments/environment';

// mapbox
import * as mapboxgl from 'mapbox-gl';
import { TrackingData, TrackingGeometry } from '../../../../../models/tracking.interface';

@Component({
    selector: 'tracking',
    templateUrl: './tracking.component.html',
    styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
    positions: TrackingI[];
    mapa: mapboxgl.Map;
    marker: any;
    source: mapboxgl.GeoJSONSource;
    resultado: TrackingGeometry;
    ruta2 = [
        [-68.13369, -16.495155],
        [-68.134079, -16.495744],
        [-68.133379, -16.496173],
        [-68.133436, -16.496291],
        [-68.133883, -16.496906],
        [-68.133175, -16.497377],
        [-68.132443, -16.497817],
        [-68.133199, -16.498974]
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
        // console.log('NgOnInitRes: ', this.ruta);
    }
    loginTracking() {
        // mapboxgl.accessToken = environment.mapboxKey;
        this.mapa = new mapboxgl.Map({
            accessToken: environment.mapboxKey,
            container: 'mapa-mapbox', // container id
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-68.133875, -16.495881], // starting position
            // center: [-122.48695850372314, 37.82931081282506], // starting position
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
    recorrido(ruta) {
        this.mapa.addSource('route', {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: ruta
                }
            }
        });
        const center: mapboxgl.LngLatLike = ruta[3];

        this.mapa.flyTo({
            // center: [-68.133436, -16.496291],
            center,
            zoom: 16
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
                        zoom: 7
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
                'icon-image': 'airport-15'
            }
        });
    }
    seguimiento2(geodata: GeoResultado) {
        window.setInterval(async () => {
            this.source = this.mapa.getSource('drone') as mapboxgl.GeoJSONSource;
            this.trackingService.geoNumber().subscribe(
                (res: number[][]) => {
                    console.log(res);
                    const ultimo = res.length - 1;
                    console.log(ultimo);
                    this.mapa.flyTo({
                        center: geodata.geometry.coordinates[ultimo],
                        speed: 0.5,
                        zoom: 16
                    });
                },
                (err) => {
                    console.log(err);
                }
            );
        }, 30000);
        this.trackingService.geoNumber().subscribe(
            (res: number[][]) => {
                console.log(res);
                const ultimo = res.length - 1;
                this.mapa.addSource('drone', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: geodata.geometry.coordinates[ultimo]
                        },
                        properties: {}
                    }
                });
                this.mapa.addLayer({
                    id: 'drone',
                    type: 'symbol',
                    source: 'drone',
                    layout: {
                        'icon-image': 'pitch-11'
                    },
                    paint: {
                        'icon-color': '#223b53'
                    }
                });
            },
            (err) => {
                console.log(err);
            }
        );
    }
    detenerSeguimiento() {
        this.mapa.stop();
        this.mapa.removeLayer('drone');
        this.mapa.removeSource('drone');
    }
    borrarRecorrido() {
        this.mapa.removeSource('route');
        this.mapa.removeLayer('route');
    }

    construir() {
        // lat lng
        this.trackingService.geoTracking().subscribe(
            (res: mapboxgl.LngLatLike) => {
                const geometryRes: Geometry = {
                    type: 'Point',
                    coordinates: res
                };
                const geojson: GeoResultado = {
                    geometry: geometryRes,
                    type: 'Feature'
                };
                // console.log('geometryTrackingAPI: ', geometryRes);
                console.log('geoJSON: ', geojson);
                this.seguimiento2(geojson);
            },
            (err) => {
                console.log(err);
            }
        );
    }
    getRuta() {
        this.trackingService.geoTracking().subscribe(
            (res) => {
                console.log(res);
                return res;
            },
            (err) => {
                console.log(err);
            }
        );
    }
    getRecorrido() {
        this.trackingService.geoNumber().subscribe(
            (res: number[][]) => {
                this.recorrido(res);
            },
            (err) => {
                console.log(err);
            }
        );
    }
}

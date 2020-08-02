import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    constructor(private router: Router, private trackingService: TrackingService) {
        console.log('El tracking se cargo correctamente');
    }

    ngOnInit() {
        this.trackingService.getAll().subscribe((res) => {
            this.positions = res;
            console.log(res);
        });
        Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapboxKey);
        // mapboxgl.accessToken = environment.mapboxKey;
        this.mapa = new mapboxgl.Map({
            accessToken: environment.mapboxKey,
            container: 'mapa-mapbox', // container id
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-68.1823999, -16.4938747], // starting position
            zoom: 15 // starting zoom
        });
        this.mapa.addControl(new mapboxgl.ScaleControl({ maxWidth: 100 }), 'bottom-left');
        this.mapa.on('load', () => {
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
                            zoom: 8
                        });
                        this.resultado = data.geometry;
                        console.log('[DATA: ]', this.resultado);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }, 60000);
            this.mapa.addSource('drone', { type: 'geojson', data: environment.flespiUrl });
            this.mapa.addLayer({
                id: 'drone',
                type: 'symbol',
                source: 'drone',
                layout: {
                    'icon-image': 'airfield-15'
                }
            });
        });
    }
    eliminarPosition(id: string) {
        this.trackingService.removeById(id);
        this.marker.remove();
    }
    // Mapbox
    crearMarcador(lng: number, lat: number) {
        this.marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.mapa);
    }
}

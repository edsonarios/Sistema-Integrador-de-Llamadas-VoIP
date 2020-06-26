import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackingService } from '../../../../../services/Firebase/tracking.service';
import { TrackingI } from './tracking.interface';
import { environment } from '../../../../../environments/environment';

// mapbox
import * as mapboxgl from 'mapbox-gl';
// const mapboxgl = require('mapbox-gl');
@Component({
	selector: 'tracking',
	templateUrl: './tracking.component.html'
})
export class TrackingComponent implements OnInit {
	positions: TrackingI[];
	mapa: mapboxgl.Map;
	marker: any;
	constructor(private router: Router, private trackingService: TrackingService) {
		console.log('El tracking se cargo correctamente');
	}

	ngOnInit() {
		this.trackingService.getAll().subscribe((res) => {
			this.positions = res;
			console.log(res);
		});
		// Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapboxKey);
		// mapboxgl.accessToken = environment.mapboxKey;
		this.mapa = new mapboxgl.Map({
			accessToken: environment.mapboxKey,
			container: 'mapa-mapbox', // container id
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-68.1823999, -16.4938747], // starting position
			zoom: 15 // starting zoom
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

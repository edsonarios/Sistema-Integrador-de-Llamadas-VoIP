import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackingService } from '../../../../../services/Firebase/tracking.service';
import { TrackingI } from './tracking.interface';
import { environment } from '../../../../../environments/environment';

// mapbox
import * as Mapboxgl from 'mapbox-gl';
@Component({
	selector: 'tracking',
	templateUrl: './tracking.component.html'
})
export class TrackingComponent implements OnInit {
	positions: TrackingI[];
	mapa: Mapboxgl.Map;
	constructor(private router: Router, private trackingService: TrackingService) {
		console.log('El tracking se cargo correctamente');
	}

	ngOnInit() {
		this.trackingService.getAll().subscribe((res) => {
			this.positions = res;
			console.log(res);
		});

		Mapboxgl.accessToken = environment.mapboxKey;
		this.mapa = new Mapboxgl.Map({
			container: 'mapa-mapbox', // container id
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-68.1823999, -16.4938747], // starting position
			zoom: 15 // starting zoom
		});
	}
	eliminarPosition(id: string) {
		this.trackingService.removeById(id);
		// this.ngOnInit();
	}
	// Mapbox
	crearMarcador(lng: number, lat: number) {
		const marker = new Mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.mapa);
	}
}

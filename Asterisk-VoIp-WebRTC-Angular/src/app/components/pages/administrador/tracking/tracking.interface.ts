export interface TrackingI {
    id?: string;
    lattitude: number;
    longitude: number;
}

export interface GeoResultado {
    geometry: Geometry;
    type: string;
    properties?: any;
}

export interface Geometry {
    type: string;
    coordinates: mapboxgl.LngLatLike;
}

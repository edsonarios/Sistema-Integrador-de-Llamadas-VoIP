export interface TrackingData {
    geometry: TrackingGeometry;
    type: string;
    properties?: any;
}
export interface TrackingGeometry {
    type: string;
    coordinates: number[];
}

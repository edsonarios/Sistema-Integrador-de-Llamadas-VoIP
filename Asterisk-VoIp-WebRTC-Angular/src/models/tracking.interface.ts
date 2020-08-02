export interface TrackingData {
    geometry: TrackingGeometry;
    type: string;
    properties?: string;
}
export interface TrackingGeometry {
    coordinates: number[];
    type: string;
}

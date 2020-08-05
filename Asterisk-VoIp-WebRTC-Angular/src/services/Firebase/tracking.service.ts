import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { TrackingI } from '@administrador/tracking/tracking.interface';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '@services/global';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TrackingService {
    private Tracking: AngularFirestoreCollection<TrackingI>;
    private arrayTrack: Observable<TrackingI[]>;
    public url: string;
    constructor(db: AngularFirestore, private http: HttpClient) {
        this.url = GLOBAL.url;
        this.Tracking = db.collection<TrackingI>('positions');
        this.arrayTrack = this.Tracking.snapshotChanges().pipe(
            map((actions) => {
                return actions.map((a) => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );
    }

    errorHandl(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
    getAll() {
        return this.arrayTrack;
    }
    getById(id: string) {
        return this.Tracking.doc<TrackingI>(id).valueChanges();
    }
    removeById(id: string) {
        return this.Tracking.doc(id).delete();
    }

    geoTracking(): Observable<mapboxgl.LngLatLike> {
        return this.http.get<mapboxgl.LngLatLike>(this.url + 'flespiParse').pipe(retry(1), catchError(this.errorHandl));
    }
    geoNumber(): Observable<number[][]> {
        return this.http.get<number[][]>(this.url + 'flespiParse').pipe(retry(1), catchError(this.errorHandl));
    }
}

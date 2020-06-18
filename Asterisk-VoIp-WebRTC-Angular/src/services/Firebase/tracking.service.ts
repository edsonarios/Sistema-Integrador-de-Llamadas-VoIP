import { Injectable } from '@angular/core';
import {
	AngularFirestoreCollection,
	AngularFirestore,
	AngularFirestoreModule
} from 'angularfire2/firestore';
import { TrackingI } from '@administrador/tracking/tracking.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class TrackingService {
	private Tracking: AngularFirestoreCollection<TrackingI>;
	private arrayTrack: Observable<TrackingI[]>;
	constructor(db: AngularFirestore) {
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
	getAll() {
		return this.arrayTrack;
	}
	getById(id: string) {
		return this.Tracking.doc<TrackingI>(id).valueChanges();
	}
	removeById(id: string) {
		return this.Tracking.doc(id).delete();
	}
}

/* Clase para datos de las llamadas */
export class Call {
	public id: string;
	public duracion: number;
	public type: string;
	public target: string;
	public isActive: boolean = false;
	public status: boolean = false;

	constructor() {}
}

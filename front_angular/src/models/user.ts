export class User {
	constructor(
		public id:	string,
		public nombre: string,
		public apPaterno: string,
		public apMaterno: string,
		public tipo: string,
		public direccion: string,
		public telefono: string,
		public correo: string,
		public password: string,
		public conectado: boolean,
		public salaId: string
	) {}

	
}

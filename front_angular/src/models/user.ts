export class User {
	public conectado: boolean;
		public salaId: string;
		public tipo: string;
		public usuarioId: string;

	constructor(	
		public nombre: string,
		public apPaterno: string,
		public apMaterno: string,
		public direccion: string,
		public telefono: string,
		public correo: string,
		public password: string
		
	) { 
		this.conectado = false;
		this.salaId = '2';
		this.tipo = 'standard';
	}

	// public get getUsuarioId() {
    //     return this.usuarioId;
    // }
    //public set setUsuarioId(value) {
    ///    this.usuarioId = value;
	///}

	// public get getConectado() {
    //     return this.conectado;
    // }
    // public set setConectado(value) {
    //     this.conectado = value;
	// }
	
	// public get getSalaId() {
    //     return this.salaId;
    // }
    // public set setSalaId(value) {
    //     this.salaId = value;
	// }
	
	// public get getTipo() {
    //     return this.tipo;
    // }
    // public set setTipo(value) {
    //     this.tipo = value;
    // }
}

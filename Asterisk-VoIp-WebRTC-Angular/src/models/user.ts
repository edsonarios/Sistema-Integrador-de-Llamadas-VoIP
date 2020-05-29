export class User {
  public conectado: boolean;
  public salaId: string;

  public usuarioId: string;

  constructor(
    public nombre: string,
    public apPaterno: string,
    public apMaterno: string,
    public direccion: string,
    public telefono: string,
    public correo: string,
    public password: string,
    public tipo: string
  ) {
    this.conectado = false;
    this.salaId = '1';
  }
}

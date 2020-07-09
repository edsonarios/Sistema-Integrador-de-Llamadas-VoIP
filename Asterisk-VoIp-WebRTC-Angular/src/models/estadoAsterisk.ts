export class EstadoAsterisk {
    public evento: string;
    public descripcion: string;
    constructor(res: any) {
        this.evento = res.evento;
        this.descripcion = res.descripcion;
    }
}

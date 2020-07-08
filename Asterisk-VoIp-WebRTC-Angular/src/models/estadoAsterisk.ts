export class EstadoAsterisk {
    public Evento: string;
    public Descripcion: string;
    constructor(res: any) {
        this.Evento = res.Evento;
        this.Descripcion = res.Descripcion;
    }
}

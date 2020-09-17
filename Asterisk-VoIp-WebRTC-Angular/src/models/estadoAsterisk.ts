export class EstadoAsterisk {
    public evento: string;
    public descripcion: string;
    constructor(res: any) {
        this.evento = res.evento;
        this.descripcion = res.descripcion;
    }
}
export class UsuarioEstado {
    public evento: string;
    public numero: string;
    public estado: string;
    constructor(res: any) {
        this.evento = res.evento;
        this.numero = res.numero;
        this.estado = res.estado;
    }
}

// {evento: "PeerStatus", numero: "SIP/2001", estado: "conectado"}

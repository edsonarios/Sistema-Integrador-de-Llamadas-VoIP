export class Extension{
    constructor(
        public context: string,
        public exten: string,
        public priority: string,
        public app: string,
        public appdata: string,
        public usuarioId: string
    ){}
}
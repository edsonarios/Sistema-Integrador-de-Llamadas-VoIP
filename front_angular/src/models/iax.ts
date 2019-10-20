export class Iax{
    constructor(
        public name: string, 
        public secret: string, 
        public callerid: string, 
        public type: string, 
        public context: string, 
        public host: string, 
        public disallow: string, 
        public allow: string, 
        public usuarioId: string
    ){}
}
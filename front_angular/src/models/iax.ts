export class Iax {
    
    public context: string ;
    public host: string ;
    public disallow: string ;
    public allow: string ;
    
    // alias, password, numero, idu, tipo
    constructor(
        public name: string,
        public secret: string,
        public callerid: string,
        public usuarioId: string ,
        public type: string
    ) {
         this.context = 'default',
         this.host = 'dynamic',
         this.disallow = 'disallow',
         this.allow = 'ulaw'
    }

    public get getId() {
        return this.usuarioId;
    }
    public set setId(value) {
        this.usuarioId = value;
    }
    public get getName() {
        return this.name;
    }
    public set setName(value) {
        this.name = value;
    }
    public get getSecret() {
        return this.secret;
    }
    public set setSecret(value) {
        this.secret = value;
    }
    public get getType() {
        return this.type;
    }
    public set setType(value) {
        this.type = value;
    }
    public get getContext() {
        return this.context;
    }
    public set setContext(value) {
        this.context = value;
    }
    public get getHost() {
        return this.host;
    }
    public set setHost(value) {
        this.host = value;
    }
    public get getDisallow() {
        return this.disallow;
    }
    public set setDisallow(value) {
        this.disallow = value;
    }
    public get getAllow() {
        return this.allow;
    }
    public set setAllow(value) {
        this.allow = value;
    }
    public get getCallerid() {
        return this.callerid;
    }
    public set setCallerid(value) {
        this.callerid = value;
    }
    

}

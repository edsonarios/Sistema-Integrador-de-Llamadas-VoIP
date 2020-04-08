export class SipWebRtc {
    
    public context: string ;
    public host: string ;
    public disallow: string ;
    public allow: string ;
    public qualify: string; 
    public nat: string ;
    
    public qualifyfreq: string;
    public deny: string;
    public dtnfnode: string;
    public canreinvite: string;
    public trustrpid: string;
    public sendrpid: string;
    public transport: string;
    public avpf: string;
    public force_avp: string;
    public icesupport: string;
    public encryption: string;
    public callgroup: string;
    public pickupgroup: string;
    public dial: string;
    public permit: string;
    public callcounter: string;
    public faxdetect: string;
    public directmedia: string;
    public dtlsenable: string;
    public dtlsverify: string;
    public dtlscertfile: string;
    public dtlscafile: string;
    public dtlssetup: string;
    public rtcp_mux: string;

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
         this.allow = 'ulaw', 
         this.qualify = 'yes',
         this.nat = 'force_rport,comedia',

    this.qualifyfreq= "60",
    this.deny = "0.0.0.0/0.0.0.0",
    this.dtnfnode = "rfc2833",
    this.canreinvite = "no" ,
    this.trustrpid = "yes",
    this.sendrpid = "no" ,
    this.transport = "udp,ws,wss",
    this.avpf = "yes" ,
    this.force_avp = "yes" ,
    this.icesupport = "yes" ,
    this.encryption = "yes" ,
    this.callgroup = "",
    this.pickupgroup = "",
    this.dial = "SIP/7011",
    this.permit = "0.0.0.0/0.0.0.0",
    this.callcounter = "yes" ,
    this.faxdetect = "no" ,
    this.directmedia = "no",
    this.dtlsenable = "yes" ,
    this.dtlsverify = "fingerprint",
    this.dtlscertfile = "/etc/asterisk/keys/asterisk.pem",
    this.dtlscafile = "/etc/asterisk/keys/ca.crt" ,
    this.dtlssetup = "actpass",
    this.rtcp_mux = "yes"
         
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
    public get getQualify() {
        return this.qualify;
    }
    public set setQualify(value) {
        this.qualify = value;
    }
    public get getNat() {
        return this.nat;
    }
    public set setNat(value) {
        this.nat = value;
    }

}

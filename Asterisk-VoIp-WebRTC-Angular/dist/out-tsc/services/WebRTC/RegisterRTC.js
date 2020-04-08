var RTCConfig = /** @class */ (function () {
    function RTCConfig(sip, secret, host) {
        this.sip = sip;
        this.secret = secret;
        this.host = host;
    }
    RTCConfig.prototype.createConfig = function (socket) {
        return {
            sockets: [socket],
            uri: "sip:" + this.sip + "@" + this.host,
            authorization_user: this.sip,
            // ws_servers: config.WS, // WS Server
            display_name: this.sip,
            password: this.secret,
            contact_uri: "sip:" + this.sip + "@" + this.host,
            realm: this.host
        };
    };
    return RTCConfig;
}());
export { RTCConfig };

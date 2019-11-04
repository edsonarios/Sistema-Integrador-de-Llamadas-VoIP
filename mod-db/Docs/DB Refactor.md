# Refactor DB Asterisk

### Table of Contents
  * [CDR Table](#cdr-table)
  * [SIP Table](#sip-table)
  * [IAX Table](#iax-table)
  * [Contacts Table](#contacts-table)
  * [Extensions table](#extensions-table)
  * [Queues Table](#queues-table)
  * [Queue Members Table](#queue-members-table)
  * [Voicemail Messages Table](#voicemail-messages-table)
  * [Voicemail Table](#voicemail-table)

### CDR Table

```sql
CREATE TABLE cdr (
    accountcode VARCHAR(20), 
    src VARCHAR(80), 
    dst VARCHAR(80), 
    dcontext VARCHAR(80), 
    clid VARCHAR(80), 
    channel VARCHAR(80), 
    dstchannel VARCHAR(80), 
    lastapp VARCHAR(80), 
    lastdata VARCHAR(80), 
    start TIMESTAMP WITHOUT TIME ZONE, 
    answer TIMESTAMP WITHOUT TIME ZONE, 
    "end" TIMESTAMP WITHOUT TIME ZONE, 
    duration INTEGER, 
    billsec INTEGER, 
    disposition VARCHAR(45), 
    amaflags VARCHAR(45), 
    userfield VARCHAR(256), 
    uniqueid VARCHAR(150), 
    linkedid VARCHAR(150), 
    peeraccount VARCHAR(20), 
    sequence INTEGER
);
```

### SIP Table

Valores para configurar los **SIP**

```sql
CREATE TYPE type_values AS ENUM ('friend', 'user', 'peer');
CREATE TYPE sip_transport_values AS ENUM ('udp', 'tcp', 'tls', 'ws', 'wss', 'udp,tcp', 'tcp,udp');
CREATE TYPE sip_dtmfmode_values AS ENUM ('rfc2833', 'info', 'shortinfo', 'inband', 'auto');
CREATE TYPE sip_directmedia_values AS ENUM ('yes', 'no', 'nonat', 'update');
CREATE TYPE yes_no_values AS ENUM ('yes', 'no');
CREATE TYPE sip_progressinband_values AS ENUM ('yes', 'no', 'never');
CREATE TYPE sip_session_timers_values AS ENUM ('accept', 'refuse', 'originate');
CREATE TYPE sip_session_refresher_values AS ENUM ('uac', 'uas');
CREATE TYPE sip_callingpres_values AS ENUM ('allowed_not_screened', 'allowed_passed_screen', 'allowed_failed_screen', 'allowed', 'prohib_not_screened', 'prohib_passed_screen', 'prohib_failed_screen', 'prohib');
```

Tabla para los **SIP**

```sql
CREATE TABLE sippeers (
    id SERIAL NOT NULL, 
    name VARCHAR(40) NOT NULL, 
    ipaddr VARCHAR(45), 
    port INTEGER, 
    regseconds INTEGER, 
    defaultuser VARCHAR(40), 
    fullcontact VARCHAR(80), 
    regserver VARCHAR(20), 
    useragent VARCHAR(20), 
    lastms INTEGER, 
    host VARCHAR(40), 
    type type_values, 
    context VARCHAR(40), 
    permit VARCHAR(95), 
    deny VARCHAR(95), 
    secret VARCHAR(40), 
    md5secret VARCHAR(40), 
    remotesecret VARCHAR(40), 
    transport sip_transport_values, 
    dtmfmode sip_dtmfmode_values, 
    directmedia sip_directmedia_values, 
    nat VARCHAR(29), 
    callgroup VARCHAR(40), 
    pickupgroup VARCHAR(40), 
    language VARCHAR(40), 
    disallow VARCHAR(200), 
    allow VARCHAR(200), 
    insecure VARCHAR(40), 
    trustrpid yes_no_values, 
    progressinband sip_progressinband_values, 
    promiscredir yes_no_values, 
    useclientcode yes_no_values, 
    accountcode VARCHAR(40), 
    setvar VARCHAR(200), 
    callerid VARCHAR(40), 
    amaflags VARCHAR(40), 
    callcounter yes_no_values, 
    busylevel INTEGER, 
    allowoverlap yes_no_values, 
    allowsubscribe yes_no_values, 
    videosupport yes_no_values, 
    maxcallbitrate INTEGER, 
    rfc2833compensate yes_no_values, 
    mailbox VARCHAR(40), 
    "session-timers" sip_session_timers_values, 
    "session-expires" INTEGER, 
    "session-minse" INTEGER, 
    "session-refresher" sip_session_refresher_values, 
    t38pt_usertpsource VARCHAR(40), 
    regexten VARCHAR(40), 
    fromdomain VARCHAR(40), 
    fromuser VARCHAR(40), 
    qualify VARCHAR(40), 
    defaultip VARCHAR(45), 
    rtptimeout INTEGER, 
    rtpholdtimeout INTEGER, 
    sendrpid yes_no_values, 
    outboundproxy VARCHAR(40), 
    callbackextension VARCHAR(40), 
    timert1 INTEGER, 
    timerb INTEGER, 
    qualifyfreq INTEGER, 
    constantssrc yes_no_values, 
    contactpermit VARCHAR(95), 
    contactdeny VARCHAR(95), 
    usereqphone yes_no_values, 
    textsupport yes_no_values, 
    faxdetect yes_no_values, 
    buggymwi yes_no_values, 
    auth VARCHAR(40), 
    fullname VARCHAR(40), 
    trunkname VARCHAR(40), 
    cid_number VARCHAR(40), 
    callingpres sip_callingpres_values, 
    mohinterpret VARCHAR(40), 
    mohsuggest VARCHAR(40), 
    parkinglot VARCHAR(40), 
    hasvoicemail yes_no_values, 
    subscribemwi yes_no_values, 
    vmexten VARCHAR(40), 
    autoframing yes_no_values, 
    rtpkeepalive INTEGER, 
    "call-limit" INTEGER, 
    g726nonstandard yes_no_values, 
    ignoresdpversion yes_no_values, 
    allowtransfer yes_no_values, 
    dynamic yes_no_values, 
    path VARCHAR(256), 
    supportpath yes_no_values, 
    PRIMARY KEY (id), 
    UNIQUE (name)
);
```

### IAX Table

```sql
CREATE TABLE iaxfriends (
    id SERIAL NOT NULL, 
    name VARCHAR(40) NOT NULL, 
    type type_values, 
    username VARCHAR(40), 
    mailbox VARCHAR(40), 
    secret VARCHAR(40), 
    dbsecret VARCHAR(40), 
    context VARCHAR(40), 
    regcontext VARCHAR(40), 
    host VARCHAR(40), 
    ipaddr VARCHAR(40), 
    port INTEGER, 
    defaultip VARCHAR(20), 
    sourceaddress VARCHAR(20), 
    mask VARCHAR(20), 
    regexten VARCHAR(40), 
    regseconds INTEGER, 
    accountcode VARCHAR(20), 
    mohinterpret VARCHAR(20), 
    mohsuggest VARCHAR(20), 
    inkeys VARCHAR(40), 
    outkeys VARCHAR(40), 
    language VARCHAR(10), 
    callerid VARCHAR(100), 
    cid_number VARCHAR(40), 
    sendani yes_no_values, 
    fullname VARCHAR(40), 
    trunk yes_no_values, 
    auth VARCHAR(20), 
    maxauthreq INTEGER, 
    requirecalltoken iax_requirecalltoken_values, 
    encryption iax_encryption_values, 
    transfer iax_transfer_values, 
    jitterbuffer yes_no_values, 
    forcejitterbuffer yes_no_values, 
    disallow VARCHAR(200), 
    allow VARCHAR(200), 
    codecpriority VARCHAR(40), 
    qualify VARCHAR(10), 
    qualifysmoothing yes_no_values, 
    qualifyfreqok VARCHAR(10), 
    qualifyfreqnotok VARCHAR(10), 
    timezone VARCHAR(20), 
    adsi yes_no_values, 
    amaflags VARCHAR(20), 
    setvar VARCHAR(200), 
    PRIMARY KEY (id), 
    UNIQUE (name)
);
```

### Contacts Table

```sql
CREATE TABLE ps_contacts (
    id VARCHAR(40) NOT NULL, 
    uri VARCHAR(40), 
    expiration_time VARCHAR(40), 
    qualify_frequency INTEGER, 
    UNIQUE (id)
);
```

### Extensions table

```sql
CREATE TABLE extensions (
    id BIGSERIAL NOT NULL, 
    context VARCHAR(40) NOT NULL, 
    exten VARCHAR(40) NOT NULL, 
    priority INTEGER NOT NULL, 
    app VARCHAR(40) NOT NULL, 
    appdata VARCHAR(256) NOT NULL, 
    PRIMARY KEY (id), 
    UNIQUE (context, exten, priority), 
    UNIQUE (id)
);
```

### Queues Table

```sql
CREATE TYPE queue_autopause_values AS ENUM ('yes', 'no', 'all');
CREATE TYPE queue_strategy_values AS ENUM ('ringall', 'leastrecent', 'fewestcalls', 'random', 'rrmemory', 'linear', 'wrandom', 'rrordered');

CREATE TABLE queues (
    name VARCHAR(128) NOT NULL, 
    musiconhold VARCHAR(128), 
    announce VARCHAR(128), 
    context VARCHAR(128), 
    timeout INTEGER, 
    ringinuse yesno_values, 
    setinterfacevar yesno_values, 
    setqueuevar yesno_values, 
    setqueueentryvar yesno_values, 
    monitor_format VARCHAR(8), 
    membermacro VARCHAR(512), 
    membergosub VARCHAR(512), 
    queue_youarenext VARCHAR(128), 
    queue_thereare VARCHAR(128), 
    queue_callswaiting VARCHAR(128), 
    queue_quantity1 VARCHAR(128), 
    queue_quantity2 VARCHAR(128), 
    queue_holdtime VARCHAR(128), 
    queue_minutes VARCHAR(128), 
    queue_minute VARCHAR(128), 
    queue_seconds VARCHAR(128), 
    queue_thankyou VARCHAR(128), 
    queue_callerannounce VARCHAR(128), 
    queue_reporthold VARCHAR(128), 
    announce_frequency INTEGER, 
    announce_to_first_user yesno_values, 
    min_announce_frequency INTEGER, 
    announce_round_seconds INTEGER, 
    announce_holdtime VARCHAR(128), 
    announce_position VARCHAR(128), 
    announce_position_limit INTEGER, 
    periodic_announce VARCHAR(50), 
    periodic_announce_frequency INTEGER, 
    relative_periodic_announce yesno_values, 
    random_periodic_announce yesno_values, 
    retry INTEGER, 
    wrapuptime INTEGER, 
    penaltymemberslimit INTEGER, 
    autofill yesno_values, 
    monitor_type VARCHAR(128), 
    autopause queue_autopause_values, 
    autopausedelay INTEGER, 
    autopausebusy yesno_values, 
    autopauseunavail yesno_values, 
    maxlen INTEGER, 
    servicelevel INTEGER, 
    strategy queue_strategy_values, 
    joinempty VARCHAR(128), 
    leavewhenempty VARCHAR(128), 
    reportholdtime yesno_values, 
    memberdelay INTEGER, 
    weight INTEGER, 
    timeoutrestart yesno_values, 
    defaultrule VARCHAR(128), 
    timeoutpriority VARCHAR(128), 
    PRIMARY KEY (name)
);
```

### Queue Members Table

```sql
CREATE TABLE queue_members (
    queue_name VARCHAR(80) NOT NULL, 
    interface VARCHAR(80) NOT NULL, 
    uniqueid VARCHAR(80) NOT NULL, 
    membername VARCHAR(80), 
    state_interface VARCHAR(80), 
    penalty INTEGER, 
    paused INTEGER, 
    PRIMARY KEY (queue_name, interface)
);
```

### Voicemail Messages Table

```sql
CREATE TABLE voicemail_messages (
    dir VARCHAR(255) NOT NULL, 
    msgnum INTEGER NOT NULL, 
    context VARCHAR(80), 
    macrocontext VARCHAR(80), 
    callerid VARCHAR(80), 
    origtime INTEGER, 
    duration INTEGER, 
    recording BYTEA, 
    flag VARCHAR(30), 
    category VARCHAR(30), 
    mailboxuser VARCHAR(30), 
    mailboxcontext VARCHAR(30), 
    msg_id VARCHAR(40)
);
```

### Voicemail Table

```sql
CREATE TABLE voicemail (
    uniqueid SERIAL NOT NULL, 
    context VARCHAR(80) NOT NULL, 
    mailbox VARCHAR(80) NOT NULL, 
    password VARCHAR(80) NOT NULL, 
    fullname VARCHAR(80), 
    alias VARCHAR(80), 
    email VARCHAR(80), 
    pager VARCHAR(80), 
    attach yes_no_values, 
    attachfmt VARCHAR(10), 
    serveremail VARCHAR(80), 
    language VARCHAR(20), 
    tz VARCHAR(30), 
    deletevoicemail yes_no_values, 
    saycid yes_no_values, 
    sendvoicemail yes_no_values, 
    review yes_no_values, 
    tempgreetwarn yes_no_values, 
    operator yes_no_values, 
    envelope yes_no_values, 
    sayduration INTEGER, 
    forcename yes_no_values, 
    forcegreetings yes_no_values, 
    callback VARCHAR(80), 
    dialout VARCHAR(80), 
    exitcontext VARCHAR(80), 
    maxmsg INTEGER, 
    volgain NUMERIC(5, 2), 
    imapuser VARCHAR(80), 
    imappassword VARCHAR(80), 
    imapserver VARCHAR(80), 
    imapport VARCHAR(8), 
    imapflags VARCHAR(80), 
    stamp TIMESTAMP WITHOUT TIME ZONE, 
    PRIMARY KEY (uniqueid)
);
```
# mod-db

## Usage

``` js
const setupDatabase = require('mod-db')

setupDabase(config).then(db => {
  const { Agent, Metric } = db

}).catch(err => console.error(err))
```
## Install
  sudo apt-get install unixodbc unixodbc-dev odbc-postgresql

  sudo apt-get install postgresql postgresql-client postgresql-contrib libpq-dev
  
  

  Copiar los archivos 
  
  cd mod-db/etc && cp odbcinst.ini /etc/
  cd mod-db/etc && cp odbc.ini /etc/
  cd .. && cd etc-asterisk && cp * /etc/asterisk -rf
  
  ### Alias
  Copia Archivos de repositorio a linux

  sudo echo "alias cpA='pushd /home/ubuntu/Sistema-Integrador-de-Llamadas-VoIP/mod-db/etc/;sudo cp * /etc/ -rf;cd ..;cd etc-asterisk/;sudo cp * /etc/asterisk/ -rf;popd'" >> ~/.bash_aliases

  Copia Archivos de linux a repositorio

  sudo echo "alias cpL='pushd /etc/;sudo cp odbcinst.ini /home/ubuntu/Sistema-Integrador-de-Llamadas-VoIP/mod-db/etc/ -rf;sudo cp odbc.ini /home/ubuntu/Sistema-Integrador-de-Llamadas-VoIP/mod-db/etc/ -rf;cd asterisk/;sudo cp * /home/ubuntu/Sistema-Integrador-de-Llamadas-VoIP/mod-db/etc-asterisk/ -rf;popd'" >> ~/.bash_aliases

  ### Archivos modificados
    /etc/asterisk/res_odbc.conf
    /etc/asterisk/res_pgsql.conf
    /etc/asterisk/cdr_pgsql.conf

## CREA LA BASE DE DATOS
  sudo su postgres
  psql
  CREATE ROLE asterisk WITH LOGIN PASSWORD 'asterisk';
  CREATE DATABASE asterisk;
  GRANT ALL PRIVILEGES ON DATABASE asterisk TO asterisk;
  \quit

## VER BD ESPECIFICO
  sudo su - postgres
  psql -U postgres asterisk
  \dt

## Iniciar la DB
  npm install
  npm run setup
  sudo echo "alias db='pushd /home/ubuntu/Sistema-Integrador-de-Llamadas-VoIP/mod-db/;npm run setup;popd'" >> ~/.bash_aliases

## Comprobar funcionamiento
  #Asterisk
  cli> odbc show
  #Consola Linux
  echo "select 1" | isql -v asterisk
  cdr show pgsql status

## Para los fronts
  ### Instalar
  sudo apt-get install postgresql postgresql-client postgresql-contrib libpq-dev
  service postgresql restart

  ### Iniciar DB
  sudo su postgres
  psql
  CREATE ROLE asterisk WITH LOGIN PASSWORD 'asterisk';
  CREATE DATABASE asterisk;
  GRANT ALL PRIVILEGES ON DATABASE asterisk TO asterisk;
  \quit

  #### Inicializar DB
  cd mod-db
  npm install
  npm run setup -y

  ### Crear certificado SSL
  ./ast_tls_cert -C monitoreafacil.com -O "My Organization" -d /etc/asterisk/keys
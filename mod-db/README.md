## Table of Contents
- [Instalar Asterisk](#instalar-asterisk)
- [Crear certificado SSL](#crear-certificado-ssl)
- [Instalar Postgresql](#instalar-postgresql)
- [Iniciar la base de datos con Node.js](#iniciar-la-base-de-datos-con-nodejs)
- [Crear alias para el Backend](#crear-alias-para-el-backend)
- [Docs](#docs)
## Instalar Asterisk
Descargar ASTERISK

* [Asterisk stable version](https://www.asterisk.org/downloads/asterisk/all-asterisk-versions)

Una vez que se completa la descarga, **extraemos el contenido del paquete descargado**

```bash
sudo tar zxf asterisk-XXX-current.tar.gz
cd asterisk-XXX
```

Usaremos el **`script install_prereq` para resolver todas las dependencias** en nuestro sistema

```bash
sudo contrib/scripts/install_prereq install
```

El anterior comando instalará todos los paquetes necesarios. Al finalizar con éxito, imprimirá el siguiente mensaje

```
#############################################
## install completed successfully
#############################################
```

Instalación del servicio de Asterisk

```bash
sudo ./configure
sudo make menuselect
```
Para colocar el **idioma** a español se debe seleccionar los siguientes módulos

```
Core Sound Packages
	[*] CORE-SOUNDS-ES-ULAW
	[*] CORE-SOUNDS-ES-ALAW
	[*] CORE-SOUNDS-ES-GSM  
```

> **Nota** también seleccionar `CORE-SOUNDS-EN-XXX` **ulaw, alaw, gsm**

continuar con las **instalación**

```bash
sudo make
sudo make install
sudo make samples
sudo make config
```

## Crear certificado SSL

Para el funcionamiento del WebRTC se debe crear los certificados auto firmados

```bash
sudo mkdir /etc/asterisk/keys
sudo contrib/scripts/ast_tls_cert -C monitoreafacil.com -O "My Organization" -d /etc/asterisk/keys
```

Se debe colocar un contraseña este proceso se repetirá varias veces

> **Nota** para que el navegador reconozca el certificado se debe colocar la siguiente 
>
> **URL**: `https://ip_server:8089/ws` 

## Instalar Postgresql

Instalar dependencias de `Postgresql`

```bash
sudo apt-get install unixodbc unixodbc-dev odbc-postgresql
sudo apt-get install postgresql postgresql-client postgresql-contrib libpq-dev
```

Copiar los archivos del repositorio de **Git** `mod-db/etc`  y `mod-db/etc-asterisk` 

```bash
sudo cp odbcinst.ini /etc/ 
sudo cp odbc.ini /etc/ 
cd ..
cd etc-asterisk && cp * /etc/asterisk -rf
```

Crear `DB` para **Asterisk** y configurar un usuario con password

```bash
sudo -u postgres psql
CREATE ROLE asterisk WITH LOGIN PASSWORD 'asterisk'; 
CREATE DATABASE asterisk; 
GRANT ALL PRIVILEGES ON DATABASE asterisk TO asterisk;
\quit
```

Ingresar a la consola de `Posgresql`

```bash
sudo -u postgres psql -U postgres asterisk 
asterisk-# \dt #data table
```
Verificar conexión de la **DB** en **Asterisk**
```
*CLI> odbc show 

ODBC DSN Settings
-----------------
  Name:   asterisk
  DSN:    asterisk
    Last connection attempt: 1969-12-31 20:00:00
    Number of active connections: 1 (out of 100)
    Logging: Enabled
    Number of prepares executed: 13
    Number of queries executed: 12
    ...
```
Verificar conexión con **Postgresql**
```bash
$ echo "select 1" | isql -v asterisk asterisk asterisk cdr show pgsql status
```

## Iniciar la base de datos con Node.js

En la carpeta `mod-db/`  ejecutar

```bash
npm install
npm run setup 
sudo echo "alias db='cd <ruta_git>/Sistema-Integrador-de-Llamadas-VoIP/mod-db/;npm run setup'" >> ~/.zshrc # opcional ~/.bash_aliases
```

## Crear alias para el Backend

Crear alias para **copiar** los archivos a la carpeta de **Git**  desde `/etc/asterisk/*`

```bash
sudo echo "alias cpA='pushd <ruta_git>/Sistema-Integrador-de-Llamadas-VoIP/mod-db/etc/;sudo cp * /etc/ -rf;cd ..;cd etc-asterisk/;sudo cp * /etc/asterisk/ -rf;popd'" >> ~/.zshrc 
```
Alias para **copiar las configuraciones** de la **DB** ubicada en `/etc/` a la carpeta de **Git**
```bash
sudo echo "alias cpL='pushd /etc/;sudo cp odbcinst.ini <ruta_git>/Sistema-Integrador-de-Llamadas-VoIP/mod-db/etc/ -rf;sudo cp odbc.ini <ruta_git>/Sistema-Integrador-de-Llamadas-VoIP/mod-db/etc/ -rf;cd asterisk/;sudo cp * <ruta_git>/Sistema-Integrador-de-Llamadas-VoIP/mod-db/etc-asterisk/ -rf;popd'" >> ~/.zshrc
```

> **NOTA**
>
> Para crear los alias pueden usar  `>> ~/.bash_aliases` si usan la t**erminal por defecto** del sistema en caso que usen **Oh My ZSH** deben usar `>> ~/.zshrc`

## Docs

* [Refactor DB Asterisk](https://github.com/edsonarios/Sistema-Integrador-de-Llamadas-VoIP/blob/master/mod-db/Docs/DB%20Refactor.md)
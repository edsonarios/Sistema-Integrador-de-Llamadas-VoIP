# mod-api

## Install
    cd mod-api
    npm install
## Iniciar 
    npm run start-dev
    sudo echo "alias api='pushd /home/ubuntu/Sistema-Integrador-de-Llamadas-VoIP/mod-api/;npm run start-dev;popd'" >> ~/.bash_aliases
# Apis http://ip:3000/api/
    #Sala
    post /addSala       (Agrega una nueva sala)
        parametros = Todo el objeto
    put /updateSala    (Envias el id de lo que modificaras y todo el objeto )
        parametros = id, Todo el objeto
    post /findByIdSala  (Apartir de un id especifico, devuelve solo 1 resultado)
        parametros = id
    get /findAllSala    (Devuelve todos los resultados de la tabla)
        parametros = No necesita nada

    post /addUsuario    
        parametros = salaId, Todo el objeto
    put /updateUsuario
        parametros = id, Todo el objeto
    post /findByIdUsuario
        parametros = id
    get /findAllUsuario
        parametros = No necesita nada
    post /login         (login)
        parametros = correo,password

    post /addSip
        parametros = usuarioId, Todo el objeto
    put /updateSip
        parametros = id, Todo el objeto
    post /findByIdSip
        parametros = id
    get /findAllSip
        parametros = No necesita nada

    post /addExtension
        parametros = salaId, Todo el objeto
    put /updateExtension
        parametros = id, Todo el objeto
    post /findByIdExtension
        parametros = id
    get /findAllExtension
        parametros = No necesita nada

## Datos Prueba
    get /datosRoot              (añade usuario root)
    get /datosOperador          (añade usuario operador)
    get /datosPrueba            (Añade 1 sala default, 2 usuarios, cada usuario con su sip, y 2 extensions, 201 para demo-congrats y _7XXX para que todos los 7XXX puedan llamarse)
    
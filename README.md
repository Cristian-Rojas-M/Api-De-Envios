## Objetivos del Proyecto

-Construir una api utilizar Nodejs, Express, Mysql y Sequelize.

-El puerto que use es el localhost:3001

-Donde se crea una tabla "shippings" , que tiene las siguentes estructura :

    + customer          Nombre del cliente  STRING
    + descrip           Descripción del envío TEXT
    + status            Estatus del envío Valores aceptables son   ENUM [Pendiente ,En proceso, Entregado ]
    + origin_lat        Latitud de origen   DOUBLE
    + origin_long       Longitud de origin   DOUBLE
    + current_lat       Latitud de la ubicación actual  DOUBLE
    + current_long      Longitud de la ubicación actual  DOUBLE
    + end_lat           Latitud de entrega  DOUBLE
    + end_long          Longitud de destino   DOUBLE
    + aprox_distance    Distancia aproximada al destino en KM con respecto a la posición actual    FLOAT
    + finish_at         Fecha en la que se entregó el paquete  DATE

-La conexion esta echa con varriables de entorno

    + DB_USER=    "Su numbre de usuario de mysql"
    + DB_PASSWORD=      "Su password de mysql"
    + DB_HOST= localhost   "Se pone por default"
    + DB_NAME=     "El nombre de la base de datos"

-Una ves creada las variables de entorno , esta instalado "nodemon" + Iniciar el proyecto con el comando "npm start"

-Mysql esta corriendo con "XAMPP"

-A esta altura ya se tendria que correr la base de datos y tambien se tuvo que crear la tabla "shippings" en la base de datos.

-Para cargar un envio en la base de datos y probar las rutas use "POSTMAN"

    + Metodo POST ,mandar un objeto con las siguientes variables :
        "customer"
        "descrip"
        "status"
        "origin_lat"
        "origin_long"
        "end_lat"
        "end_log"

    + Ruta = http://localhost:3001/shippings/createShipping

    + Ya estaria creado el envio , y devuelve los datos del envio mas la distancia aproximada .
    ##

    + Metodo PUT para actualizar localizacion del envio  con las siguientes variables :
        "id"
        "current_lat"
        "current_long"

    + Ruta =  http://localhost:3001/shippings/updateSend

    + En este paso ya se actualiza la localizacion del envio y retorna el estado "En proceso" del envio junto a la distancia aproximada .
    ##

    + Metodo GET con este hacemos el seguimiento del envio , le pasamos el "id" por params .

    +Ruta =  http://localhost:3001/shippings/ViewShipmentSstatus/1

    + Esto nos retorna el cliente , la descripcion , el estado y la distancia aproximada del envio.
    ##

    + Metodo PUT este sirve para setear el estado del envio en "Entregado"
        "id"
        "status" :"Entregado"

    +Ruta =  http://localhost:3001/shippings/shippingDelivered

    +Esto devuelve toda la informacion del invio y se guarda la fecha en  "finish_at" .

- PD : Las latitudes y longitudes se probaron con las de Google Map .

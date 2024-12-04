import Ws from 'App/Services/Ws'
Ws.boot() //Lo arrancamos

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => { //La puerta de entrada cuando alguien se quiere conecktar
    //Cuando se conecto alguein mostramos mensaje
    console.log("nuevo dispositivo conectado") 
    let id = socket.id; //El navegador genera un identificador para saber a que computador
    const body  = socket.handshake.query //Contiene la informacion detalles como los encaabezados HTTP
    console.log("body del socket "+JSON.stringify(body))
    console.log("se conectó " + id)
    socket.emit('notifications', { hello: 'world' }) //Mensaje para indicar que la conexion fue exitosa

})
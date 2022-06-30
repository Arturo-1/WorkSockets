const { Socket } = require('dgram')
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(8080, () => { console.log('Servisdor conectado pueto 8080') })
const io = new IOServer(expressServer)
const producto = [{ title: "Laptop", price: "2500", thumbnail: "img-laptop" },
    { title: "Tablet", price: "1000", thumbnail: "img-tablet" },

]
const messagesArray = []
app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', socket => {
    console.log(`Usuario conectado Recientemente ${socket.id}`)
    socket.on('client:product', productInfo => {
        producto.push(productInfo)
        io.emit('server:productos', producto)
        console.log(producto)
    })
    socket.emit('server:productos', producto)
        //Socket Mensajes
    socket.emit('server:mensajes', messagesArray)
    socket.on('client:menssage', messageInfo => {
        fs.appendFileSync(`./Messages/appMensajes.txt`, JSON.stringify(messageInfo))
        messagesArray.push(messageInfo)
        io.emit('server:mensajes', messagesArray)
            //console.log(messageInfo)
    })
})
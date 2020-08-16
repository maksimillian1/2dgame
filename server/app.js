const Express = require('express')()  
const Http = require('http').Server(Express)
const SockerIo = require('socket.io')(Http)


let position = {
    x: 200,
    y: 200
}

SockerIo.on("connection", socket => {
    socket.emit('position', position)
    socket.on('move', data => {
        console.log(data);
        switch(data) {
            case 'left':
                position.x = position.x - 5
                SockerIo.emit('position', position)
                break
            case 'right':
                position.x = position.x + 5
                SockerIo.emit('position', position)
                break
            case 'up':
                position.y = position.y + 5
                SockerIo.emit('position', position)
                break
            case 'down':
                position.y = position.y - 5
                SockerIo.emit('position', position)
            break
            default:
                break
        }
    })
})

Http.listen(3000, () => {
    console.log('started');
})


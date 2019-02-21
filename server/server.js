
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')


var express = require('express'),
    http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
// io.set('origins', '*:*')

server.listen(9093, function () {
        console.log('Node app start at port 9093')
    })
    
    app.get('/', function (req, res) {
        res.send('Home')
    });
    
    io.on('connection', function(socket){
        
        console.log('user login')
        socket.on('sendmsg', function(data){
            console.log('sendmsg', data)
            // io.emit('recvmsg', data)
            const {from, to, msg} = data
            const chatid = [from,to].sort().join('_')
            Chat.create({chatid, from, to, content:msg}, function(err, doc){
                io.emit('recvmsg', Object.assign({}, doc._doc))
            })
        })
    })
    const userRouter = require('./user')


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

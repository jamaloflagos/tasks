const express = require('express');
const http = require('http');
const { mongoose } = require('mongoose');
const ConnectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');
const {Server} = require("socket.io");
const cors = require('cors');
const PORT = process.env.PORT || 3500


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
      }
});


ConnectDB()

app.use(cors(corsOptions));

app.use(express.json());

app.use('/profile', require('./routes/profile'))
app.use('/task', require('./routes/apis/task'))

mongoose.connection.once('open', () => {
    console.log('connnected to MongoDB');  
    server.listen(PORT, () => console.log(`connected to server and running on port ${PORT}`));
})

mongoose.connection.on('error', error => {
    console.log(error);
})

io.on("connection", socket => {
    console.log("socket connection madee");
    
    socket.on("login", data => {
        // io.sockets.emit("", data)
        console.log(data);
        
        socket.broadcast.emit("login", data)
    })
    
    socket.on("add-task", data => {
        // io.sockets.emit("", data)
        console.log(data);
        
        socket.broadcast.emit("add-task", data)
    })

    socket.on("edit-task", data => {
        // io.sockets.emit("", data)
        console.log(data);
        
        socket.broadcast.emit("edit-task", data)
    })

    socket.on("delete-task", data => {
        // io.sockets.emit("", data)
        console.log(data);
        
        socket.broadcast.emit("delete-task", data)
    })

    socket.on("mark-as-complete", data => {
        // io.sockets.emit("", data)
        console.log(data);

        socket.broadcast.emit("mark-as-complete", data)
        
    })
})
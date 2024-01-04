const { Server } = require("socket.io");
const server = require("./server");

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
      }
});

io.on("connection", socket => {
    console.log("socket connection madee");
    
    socket.on("login", data => {
        // io.sockets.emit("", data)
        console.log(data);
        
    })
})
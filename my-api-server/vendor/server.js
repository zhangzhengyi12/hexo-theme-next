let app = require("http").createServer();
let io = require("socket.io")(app);
let port = 3001;
let clientCount = 0;
let socketMap = {};

app.listen(port);

function bindEvent(socket, event) {
  socket.on(event, data => {
    if (socket.clientID % 2 === 0) {
      if (socketMap[socket.clientID - 1]) {
        socketMap[socket.clientID - 1].emit(event, data);
      }
    } else {
      if (socketMap[socket.clientID + 1]) {
        socketMap[socket.clientID + 1].emit(event, data);
      }
    }
  });
}

io.on("connection", socket => {
  clientCount = clientCount + 1;
  socket.clientID = clientCount;
  socketMap[clientCount] = socket;
  if (clientCount % 2 === 1) {
    console.log("wating");
    socket.emit("waiting", "等待玩家进入");
  } else {
    console.log("start");
    socket.emit("start");
    if (socketMap[clientCount - 1]) {
      socketMap[clientCount - 1].emit("start");
    } else {
      //玩家进入又离开 玩家2进入 玩家2显示离线
      socket.emit('leave')
    }
  }

  bindEvent(socket, "init");
  bindEvent(socket, "next");
  bindEvent(socket, "rotate");
  bindEvent(socket, "right");
  bindEvent(socket, "left");
  bindEvent(socket, "down");
  bindEvent(socket, "line");
  bindEvent(socket, "fall");
  bindEvent(socket, "addScope");
  bindEvent(socket, "lose");
  bindEvent(socket, "addLineSucces")

  socket.on("disconnect", () => {
    //确保删除不报错
    if (socket.clientID % 2 === 0) {
      if (socketMap[socket.clientID - 1]) {
        socketMap[socket.clientID - 1].emit("leave");
      }
    } else {
      if (socketMap[socket.clientID + 1]) {
        socketMap[socket.clientID + 1].emit("leave");
      }
    }
    delete socketMap[socket.clientID];
  });
});

console.log("ws Server listening to prot " + port);

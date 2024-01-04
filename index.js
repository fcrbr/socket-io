var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection",(socket) => {

  socket.on("disconnect", () => {
    console.log("Desconectado");
  });


  socket.on("showmsg", (data) => {
    console.log(data);
    var chat = document.getElementById("chat");
    var p = document.createElement("p");
    p.innerHTML = data.username + ": " + data.msg;
    chat.append(p);

  });

  function enviar(){
    var msgField = document.getElementById("msg");
    var usernameField = document.getElementById("username");

    var msg = msgField.value;
    var username = usernameField.value;

    socket.emit("msg", {msg: msg, username: username}, { timeout: 5000 }); // Timeout after 5 seconds

  }
});

app.set("view engine","ejs");

app.get("/", (req, res) => {
  res.render("index");
});

http.listen(3000, () => {
  console.log("APP RODANDO");
});

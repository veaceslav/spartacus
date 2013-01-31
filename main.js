(function(){
  "use strict";
  var sessionTok = "SlaviQ";
  /** Hash for users that wait for authentification **/
  var awaitHash = new Object();
  /** Hash that keeps track of players that are online
   *  name -> session token 
   */
  /** TODO: put players into different room,
   *  for easy message broadcast 
   */
  var playersOnline = new Object();

  /** Map client id with username when player
   *  successfully logged on **/
  var socketClients = new Object();

  var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);



  app.use(express.static(__dirname + '/public'));

  app.get('/', function(req, res){});

  server.listen(8080);


  var datab = require('./database.js');

  /** Open socket and listen for connections **/
  io.sockets.on('connection',function(socket){
    console.log("Client " + socket.id + " connected!");

  	socket.emit('news',TR.myVillages);

  /** Send info about clicked village **/
  	socket.on('info', function(data){
      datab.getElement(data.my,function(rez){
            socket.emit('respond',rez);
      });

  	});

    socket.on('disconnect',function(data){
      if(socketClients[socket.id]){
        delete socketClients[socket.id];
        console.log("Client "+ socket.id + " removed from socketClients!");
      }
    })
    /** When login request made, search for user and send password token **/
    socket.on('login',function(data){
        datab.getUser(data.my, function(rez){
          if(rez)
          {
            awaitHash[rez.token] = rez;
            socket.emit('token',rez.token);
          }
          else
            socket.emit('token',"error");
        });
    });

    /** Compare password token obtained from user to one from database **/
    socket.on('passwd',function(data){
          var rez = awaitHash[data.token];
          
          /** Delete temporary entry **/
          delete awaitHash[data.token];

          if(rez.password === data.pass)
          {
            socket.set('nickname',rez.name,function(){
            socketClients[rez.name] = socket.id;
            socket.emit('ack',{status: "accept", token: socket.id});

            /** Get player data from database and send it to client **/
              datab.getPlayerStats(rez.name,function(result){
                if(result){
                  socket.emit('playerData',result);
                }
                else
                  console.log("Error! Can't find player stats for" + rez.name);
              });
            });
          }
          else
          {
            socket.emit('ack',{status: "deny", token: "403" });
          }

      });
    
    /** Get register information from client **/
    socket.on('register',function(data){
      console.log(JSON.stringify(data));
      datab.getUser(data.name,function(elem){
        if(elem){
          socket.emit("regACK","userexist");
          console.log("User exist in database");
        }
        else{
          datab.addUser(data,function(){
            socket.emit("regACK","ack");
            console.log("Add user ack");
          });
        }
      });
    });

  }); 

  /** cached village array, to minimize database queries **/
  var TR = {
  	myVillages: []
  }



  /** Connect to database and get village list **/
  datab.connect(function()
  {
    datab.getList(function(docs){
      TR.myVillages = docs;
    });
  });

}());
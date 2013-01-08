(function(){
  "use strict";
  var sessionTok = "SlaviQ";
  var awaitHash = new Object();
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
  console.log("Client " + socket.id + " conectat!");
	socket.emit('news',TR.myVillages);
/** Send info about clicked village **/
	socket.on('info', function(data){
    datab.getElement(data.my,function(rez){
          socket.emit('respond',rez);
    });

	});
  /** When login request made, search for user and send password token **/
  socket.on('login',function(data){
      datab.getUser(data.my, function(rez){
        if(rez)
        {
          awaitHash[rez.token] = rez.name;
          socket.emit('token',rez.token);

        }
        else
          socket.emit('token',"error");
      });
  });
  /** Compare password token obtained from user to one from database **/
  socket.on('passwd',function(data){
        datab.getUser(awaitHash[data.token],function(rez){

          if(rez.passwd === data.pass)
          {
            socket.emit('ack',{status: "accept", token: sessionTok});
          }
          else
          {
            socket.emit('ack',{status: "deny", token: "403" });
          }
        });
    });
  
  /** Get register information from client **/
  socket.on('register',function(data){
    console.log(JSON.stringify(data));
  });
}); 

/** cached village array, to minimize database queries **/
var TR = {
	myVillages: []
}

/** Map size and city size **/
TR.MAX_WIDTH = 1308;
TR.MAX_HEIGHT = 738;
TR.VILLAGE_W = 128;
TR.VILLAGE_H =128;

/** Connect to database and get village list **/
datab.connect(function()
{
  datab.getList(function(docs){
    TR.myVillages = docs;
  });
});

/** Get a random nr from Interval **/
/** Not Used 
function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

function generateWH()
{
  return {
    width: randomFromInterval(0, TR.MAX_WIDTH-TR.VILLAGE_W),
    height: randomFromInterval(0,TR.MAX_HEIGHT-TR.VILLAGE_H)
  };
}

function checkConstraints(gen)
{
    for(var i=0;i<TR.myVillages.length;i++)
  {
      if((Math.abs(gen.width-TR.myVillages[i].width)< TR.VILLAGE_W)
	&& (Math.abs(gen.height-TR.myVillages[i].height)< TR.VILLAGE_H)){
	return false;
      }
  }  
  return true;
}

function getVillage()
{
  var generated;

  generated = generateWH();
  
  while(!checkConstraints(generated))
  {
    generated = generateWH();
  }
  

  generated.id = TR.myVillages.length;
  TR.myVillages.push(generated);

  //return generated;
  
}
*/
}());
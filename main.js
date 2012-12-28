(function(){
  'use strict'
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
	socket.emit('news',TR.myVillages);
	socket.on('info', function(data){
		console.log(data);
    datab.getElement(data.my,function(rez){
          socket.emit('respond',rez);
    });

	});
}); 


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
 
window.onload = function(){
 var socket = io.connect();
 socket.on('news',function(data){
 	console.log(data);
 	for( var i=0;i<data.length;i++)
 	{
 		console.log(data[i]);
 		var village = document.createElement("div");
 		village.className = "village";
 		village.setAttribute('id',data[i].id);
 		village.style.top = data[i].height+"px";
 		village.style.left = data[i].width+"px";
 		document.querySelector("#map").appendChild(village);
 	}
 	socket.emit('my other data',{my: data});


 	var map = document.querySelector("#map");

 	map.addEventListener("click", function(event){
 		//console.log(event);

 		if(event.target.nodeName == "DIV")
 			console.log(event.target.id);
 	});



 });

}
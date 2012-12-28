 
window.onload = function(){
 var socket = io.connect();
 socket.on('news',function(data){
 	console.log("Am primit de la server");
 	/** Populate map with cities **/
 	for( var i=0;i<data.length;i++)
 	{
 		var village = document.createElement("div");
 		village.className = "village";
 		village.setAttribute('id',data[i].id);
 		village.style.top = data[i].top+"px";
 		village.style.left = data[i].left+"px";
 		document.querySelector("#map").appendChild(village);
 	}
 	//socket.emit('my other data',{my: data});

 });

 /** Get detailed information about a village and open a scroll with formated information **/
socket.on('respond',function(resp){
 				console.log("Am primit raspuns" + JSON.stringify(resp));

	 			var popup = document.createElement("div");
	 			popup.setAttribute('id', "popup");

	 			var text = document.createElement("div");
	 			text.setAttribute('id',"Info");

	 			var name = document.createElement("p");
	 			name.innerHTML = "Name: " + resp.name;

	 			text.appendChild(name);

	 			var population = document.createElement("p");
	 			population.innerHTML = "Population: " + resp.population;
	 			text.appendChild(population);

	 			var desc = document.createElement("p");
	 			desc.innerHTML = "Description: " + resp.description;
	 			text.appendChild(desc);

	 			popup.appendChild(text);

	 			var button = document.createElement("input");
	 			button.setAttribute('type',"button");
	 			button.setAttribute('value',"Close");
	 			button.setAttribute('id', "closeP");

	 			button.addEventListener('click',function(event){
	 				var dv = document.querySelector("#popup");
	 				document.querySelector("#map").removeChild(dv);
	 				return false;
	 			});

	 			popup.appendChild(button);

	 			document.querySelector("#map").appendChild(popup);

			});
 var map = document.querySelector("#map");

/** Add a event listener on map, so each clicked city will make a request to server
 *  for aditional info
 */
 map.addEventListener("click", function(event){
 		//console.log(event);
 		if(event.target.class === "MAP")
 			return;

 		if(event.target.nodeName == "DIV"){
 			console.log(event.target.id);
 			socket.emit('info',{my: event.target.id});

 			

 		}
 });


}
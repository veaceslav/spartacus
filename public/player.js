define(function(){

	function playerScreen(playerInfo){
		console.log(JSON.stringify(playerInfo));
		var introTxt = document.querySelector("#scrolltext");
		var scrollTag = document.querySelector("#scroll");
			scrollTag.removeChild(introTxt);

		var playStats = document.createElement("playerArea");
			playStats.setAttribute('id',"playerstats");
			playStats.setAttribute('class',"playerstats");

		var playerName = document.createElement("p");
			playerName.setAttribute('id',"pname");
			playerName.setAttribute('class', "playertext");
			playerName.innerHTML = playerInfo.name;
			playStats.appendChild(playerName);

		var playerLife = document.createElement("p");
			playerLife.setAttribute('id',"plife");
			playerLife.setAttribute('class',"playertext");

			var life = 20+(2*parseInt(playerInfo.vitality));
			playerLife.innerHTML = "Life: " + life + " HP";
			playStats.appendChild(playerLife);

		var playerSpirit = document.createElement("p");
			playerSpirit.setAttribute('id',"pspirit");
			playerSpirit.setAttribute('class',"playertext");

			var spirit = 20 + (1.5*parseInt(playerInfo.intellect));
			playerSpirit.innerHTML = "Spirit: " + spirit + " MP";
			playStats.appendChild(playerSpirit);

		var playerStr = document.createElement("p");
			playerStr.setAttribute('id',"pstrength");
			playerStr.setAttribute('class', "playertext");
			playerStr.innerHTML = "Strength: " +playerInfo.strength;
			playStats.appendChild(playerStr);

		var playerAgil = document.createElement("p");
			playerAgil.setAttribute('id',"pagility");
			playerAgil.setAttribute('class', "playertext");
			playerAgil.innerHTML = "Agility: " + playerInfo.agility;
			playStats.appendChild(playerAgil);

		var playerVit = document.createElement("p");
			playerVit.setAttribute('id',"pvitality");
			playerVit.setAttribute('class', "playertext");
			playerVit.innerHTML = "Vitality: " + playerInfo.vitality;
			playStats.appendChild(playerVit);

		var playerIntel = document.createElement("p");
			playerIntel.setAttribute('id',"pintellect");
			playerIntel.setAttribute('class', "playertext");
			playerIntel.innerHTML = "Intellect: " + playerInfo.intellect;
			playStats.appendChild(playerIntel);

		scrollTag.appendChild(playStats);

	}
	
	return {
		playerScreen:playerScreen
	};

});
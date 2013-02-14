define(function(){

	function playerScreen(playerInfo){
		console.log(JSON.stringify(playerInfo));

		/** Set player information on scroll area **/
		clearScrollArea();
		setUpScrollArea(playerInfo);

		/** Set player controls on navigation bar **/
		clearNavigationBar();
		setUpPlayerControls(playerInfo);
	}

	/** Set player information on scroll area **/
	function setUpScrollArea(playerInfo){
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

		var scrollTag = document.querySelector("#scroll");
		scrollTag.appendChild(playStats);
	};
	function setUpPlayerControls(playerInfo){
		var navbar = document.querySelector("#bar");

		var playerBar = document.createElement("div");
			playerBar.setAttribute('id',"playerbar");
			navbar.appendChild(playerBar);

		var nameButton = document.createElement("button");
			nameButton.setAttribute('id',"nameB");
			nameButton.setAttribute('class',"navbuttons");
			nameButton.innerHTML = playerInfo.name;

		var goldDiv = document.createElement("div");
			goldDiv.setAttribute('id',"goldDiv");
			goldDiv.setAttribute('class',"navbarDiv");

		var goldImg = document.createElement("img");
			goldImg.setAttribute('id',"goldImage");
			goldImg.setAttribute('src',"images/gold.png");

			goldDiv.innerHTML = playerInfo.gold;
			goldDiv.appendChild(goldImg);

		var silverDiv = document.createElement("div");
			silverDiv.setAttribute('id',"silverDiv");
			silverDiv.setAttribute('class',"navbarDiv");

		var silverImg = document.createElement("img");
			silverImg.setAttribute('id',"silverImage");
			silverImg.setAttribute('src',"images/silver.png");

			silverDiv.innerHTML = playerInfo.silver;
			silverDiv.appendChild(silverImg);


		var statsButton = document.createElement("button");
			statsButton.setAttribute('id',"statsB");
			statsButton.setAttribute('class',"navbuttons");
			statsButton.innerHTML = "Stats";


		var infoButton = document.createElement("button");
			infoButton.setAttribute('id',"infoB");
			infoButton.setAttribute('class',"navbuttons");
			infoButton.innerHTML = "Info";


		var signOutButton = document.createElement("button");
			signOutButton.setAttribute('id',"signoutB");
			signOutButton.setAttribute('class',"navbuttons");
			signOutButton.innerHTML = "Log Out";

			/** Append them into reverse order because they will
			 * float to right
			 */
			playerBar.appendChild(signOutButton);
			playerBar.appendChild(infoButton);
			playerBar.appendChild(statsButton);
			playerBar.appendChild(silverDiv);
			playerBar.appendChild(goldDiv);
			playerBar.appendChild(nameButton);		

	}
	/** Remove all text from scroll on the right **/
	function clearScrollArea(){
		var introTxt = document.querySelector("#scrolltext");
		var scrollTag = document.querySelector("#scroll");
			scrollTag.removeChild(introTxt);
	};

	/** Remove login and Register buttons  **/
	function clearNavigationBar(){
		var navbar = document.querySelector("#bar");
		var loginB = document.querySelector("#login");
		var regB   = document.querySelector("#register");
		navbar.removeChild(loginB);
		navbar.removeChild(regB);
	}
	
	return {
		playerScreen:playerScreen
	};

});
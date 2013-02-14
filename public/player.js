define(function(){

/** This variable with learn if chat is open or closed
 *  to reuse the same function for opening and closing
 */
var chatIsOpen = 0;

/** Remember chat Text even if chat is closed **/
var chatText = document.createElement("textarea");

/** Global variable holding player's name **/
var playerName = "";

var socketV;

	function playerScreen(playerInfo,socket){
		console.log(JSON.stringify(playerInfo));
		playerName = playerInfo.name;
		socketV = socket;

		/** Set player information on scroll area **/
		clearScrollArea();
		setUpScrollArea(playerInfo);

		/** Set player controls on navigation bar **/
		clearNavigationBar();
		setUpPlayerControls(playerInfo);

		setStatusBar(socket);
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

	/** Set-up player's controls on navigation bar **/
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

	/** When player is logged in, set chat button **/
	function setStatusBar(socket){
		var chatBtn = document.createElement("button");
			chatBtn.setAttribute('id',"chatButton");
			chatBtn.setAttribute('class',"navbuttons");
			chatBtn.innerHTML = "Global Chat";
			chatBtn.addEventListener('click',function(){
				openChat();
			});

		var statusB = document.querySelector("#statusbar");
			statusB.appendChild(chatBtn);

		socket.on('globalChat',function(data){
			var msg = data.name + ": " + data.msg;
			chatText.innerHTML = chatText.value + msg + "\n";
		});
	}

	/** Close and open chat window **/
	function openChat(){

		var statusB = document.querySelector("#statusbar");
		var chatBtn = document.querySelector("#chatButton");

		if(chatIsOpen === 0){
			statusB.removeChild(chatBtn);

		var chatBody = document.createElement("div");
			chatBody.setAttribute('id',"chatbody");
			statusB.appendChild(chatBody);

			chatBody.appendChild(chatBtn);

			chatText.setAttribute('id',"chattext");
			chatBody.appendChild(chatText);

		var chatInput = document.createElement("input");
			chatInput.setAttribute('type',"text");
			chatInput.setAttribute('id',"chatinput");

			chatInput.addEventListener("keydown",function(event){
				if(event.keyCode === 13){
					var chatInput = document.querySelector("#chatinput");
					socketV.emit('globalChat',{name: playerName, msg: chatInput.value});
					chatText.innerHTML = chatText.value + "me: " 
										+ chatInput.value + "\n";
					chatInput.value = "";

				}
			});
			chatBody.appendChild(chatInput);

			chatIsOpen = 1;

		}
		else {
			statusB.removeChild(document.querySelector("#chatbody"));
			statusB.appendChild(chatBtn);

			chatIsOpen =0;
		}

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
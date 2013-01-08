define(function(){
	function loadRegister(socket){

		var registerButton = document.querySelector(".register");
		/** Add register fileds
		 *  on the top of the right scroll
		 */
		registerButton.addEventListener("click",function(event){
			var scrolltext = document.querySelector(".scrolltext");

			if(scrolltext)
				document.querySelector(".scroll").removeChild(scrolltext);

			var newsText = document.createElement("div");
				newsText.setAttribute('id',"scrolltext");
				newsText.setAttribute('class','scrolltext');

			var title = document.createElement("p");
				title.innerHTML = "Register:";
				newsText.appendChild(title);

			var username = document.createElement("p");
				username.innerHTML = "Username:<br>"+
									 "<input id=reguser type=text>";
				newsText.appendChild(username);

			var passwd = document.createElement("p");
				passwd.innerHTML = "Password:<br>" +
								   "<input id=regpasswd type=password>";
				newsText.appendChild(passwd);

			var passwd2 = document.createElement("p");
				passwd2.innerHTML = "Retype Password:<br> "+
									"<input id=regpasswd2 type=password>";
				newsText.appendChild(passwd2);

			var submitB = document.createElement("button");
				submitB.setAttribute('id',"regsubmit");
				submitB.setAttribute('class',"resubmit");
				submitB.innerHTML = "Submit";
				submitB.addEventListener("click",function(event){
					var usern = document.querySelector("#reguser");
					var passw1 = document.querySelector("#regpasswd");
					var passwd2 = document.querySelector("#regpasswd2");

					if(usern.value === ""
						|| passw1.value === ""
						|| passwd2.value === "")
					{
						if(!document.querySelector("#regerror"))
						{
							var err = document.createElement("p");
								err.innerHTML = "Please complete all fields";
								err.setAttribute('class',"error");
								err.setAttribute('id',"regerror");
								document.querySelector("#scrolltext").appendChild(err);
						}
					}
				});
				newsText.appendChild(submitB);

			var closeB = document.createElement("button");
				closeB.setAttribute('id',"regclose");
				closeB.setAttribute('class',"regclose");
				closeB.innerHTML = "Close";
				newsText.appendChild(closeB);

				/** After pressing close button
				 *  return to default greeting message
				 */
				closeB.addEventListener('click',function(event){
					var st = document.querySelector("#scrolltext");
					document.querySelector("#scroll").removeChild(st);

					var greeting =document.createElement("div");
					greeting.setAttribute('id',"scrolltext");
					greeting.setAttribute('class','scrolltext');
					greeting.innerHTML = "<p>Welcome to Spartacus,</p>" +
										 "<p>the online game.</p>" +
										 "<p>please register or log in </p>"
					document.querySelector("#scroll").appendChild(greeting);
				});


			document.querySelector(".scroll").appendChild(newsText);


		});
	};

	return {
		loadRegister:loadRegister
	};
});

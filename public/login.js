define(function(){
	var token;
	function loadLogin(socket){

		var loginButton = document.querySelector(".login");

		/** Add the following HTML Code when Log In button clicked
		 *	<div id="loginw" class="loginw">
		 *		<div id="userdiv" class="userdiv">
		 *			<p>LOGIN:</p>
		 *			<p>Username: <input type="text"></input></p>
		 *			<p>Password: <input type="password"></input></p>
		 *			<button id="loginsubmit" class="loginsubmit">Submit</button>
		 *			<button>Close</button>
		 *		</div>
		 *	</div>
		 */

		loginButton.addEventListener("click",function(event){
			var loginW = document.createElement("div");
				loginW.setAttribute('id',"loginw");
				loginW.setAttribute('class',"loginw");

			var userdiv = document.createElement("div");
				userdiv.setAttribute('id',"userdiv");
				userdiv.setAttribute('class',"userdiv");
				loginW.appendChild(userdiv);

			var title = document.createElement("p");
				title.innerHTML = "LOGIN:";
				userdiv.appendChild(title);

			var username = document.createElement("p");
				username.innerHTML = "Username: " +
									 "<input id=\"user\" type=\"text\">";
				userdiv.appendChild(username);

			var password = document.createElement("p");
				password.innerHTML = "Password " +
									 "<input id=\"passwd\" type=\"password\">";
				userdiv.appendChild(password);

			var submit = document.createElement("button");
				submit.setAttribute('id',"loginsubmit");
				submit.setAttribute('class',"loginsubmit");
				submit.innerHTML = "Submit";
				submit.addEventListener('click',function(event){
					socket.emit('login',{my: document.querySelector("#user").value });
				});
				userdiv.appendChild(submit);

			var closeBttn = document.createElement("button");
				closeBttn.innerHTML = "Close";
				closeBttn.addEventListener('click',function(){
					var lg = document.querySelector(".loginw");
					document.querySelector("#map").removeChild(lg);
				});
				userdiv.appendChild(closeBttn);


			document.querySelector("#map").appendChild(loginW);
		});

		/** Get user token from server, server will send error if no user found **/
		 socket.on('token',function(tok){
		 		if(tok === "error")
		 		{
		 			console.log("No such username!");
					displayerr();
		 			return;
		 		}
		 		token = tok;
				var passwd = document.querySelector("#passwd").value + token;
		 		socket.emit('passwd',{token: tok, pass: passwd});
		 });
		 /** Receive info if password check was successful
		   * accept and session token if everything went ok
		   * deny and 403 if password check failed
		   */
		 socket.on('ack',function(data){
		 	if(data.status === "accept"){
		 		if(!document.querySelector("#success"))
		 			{
			 			var ok = document.createElement("p");
			 			ok.innerHTML ="Success!!!";
			 			ok.setAttribute('id', "success");
			 			document.querySelector("#userdiv").appendChild(ok);
		 			}
		 	}
		 	else
		 	{
				displayerr();
		 	}
		 });

		 socket.on('playerData',function(data){
		 	console.log(JSON.stringify(data));

		 });
		 /** Display error message under submit button
		  *  if username is wrong or password doesn't match
		  *  for security reason, don't tell if it was a username
		  *  or password error
		  */
		 function displayerr(){
		 	if(!document.querySelector("#loginerror"))
		 	{
			 	var invalid = document.createElement("p");
			 	invalid.innerHTML ="Invalid Username or Password!";
			 	invalid.setAttribute('id', "loginerror");
			 	invalid.setAttribute('class',"error");
			 	document.querySelector("#userdiv").appendChild(invalid);
		 	}
		 };
	}

	return {
		loadLogin:loadLogin
	};

});
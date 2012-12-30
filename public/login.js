loadLogin = function(){

var loginButton = document.querySelector(".login");

	loginButton.addEventListener("click",function(event){
			console.log("Login clicked");
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
			username.innerHTML = "Username: " + "<input type=\"text\"><//input>";
			userdiv.appendChild(username);

		var password = document.createElement("p");
			password.innerHTML = "Password " + "<input type=\"password\"><//input>";
			userdiv.appendChild(password);

		var submit = document.createElement("button");
			submit.setAttribute('id',"loginsubmit");
			submit.setAttribute('class',"loginsubmit");
			submit.innerHTML = "Submit";
			userdiv.appendChild(submit);

		var closeBttn = document.createElement("button");
			closeBttn.innerHTML = "Close";
			userdiv.appendChild(closeBttn);

		document.querySelector("#map").appendChild(loginW);
	});
}
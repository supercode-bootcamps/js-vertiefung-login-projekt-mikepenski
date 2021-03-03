"use strict";

const USERS = [ 
    { name: "supercode", secret: "no_one_will_know" },
    { name: "music_fan_1990", secret: "WeAreTheChampi0ns" },
    { name: "admin", secret: "1234" },
];



const body = document.querySelector("body");
const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const loginUserName = document.getElementById("username");
//const loginPassword = document.getElementById("password");
const loginModalSubmit = document.getElementById("submit");
const logoutLink = document.getElementById("log-out");
const usernameContainer = document.querySelector(".username");


/*
* cookie functions
*/
var getCookie = function (name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
};

function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function deleteCookie(name) { 
    setCookie(name, '', -1); 
}

/*
* check user login input
*/
let errorMessage = (showmessage) => {

    if(showmessage == true){

            //create errorMessage and class
            const errorContainer = document.getElementById("errorMessage");   
            if(errorContainer == null){
                let errorMessage = document.createElement("div");
                errorMessage.id = "errorMessage";
                errorMessage.innerHTML = "*user does not exist.";
                loginForm.appendChild(errorMessage);
            }
            loginUserName.classList.add("alert");

    } else {

          //remove errorMessage and class
          let errorContainer = document.getElementById("errorMessage"); 
          if(errorContainer != null){
              errorContainer.parentNode.removeChild(errorContainer);
          }
          loginUserName.classList.remove("alert");
          
    }

}

/*
* write username to navbar and remove css classes
*/
let welcomeUser = (userName) => {
    body.classList.remove("modalOpen");
    loginModal.classList.add("d-none");
    usernameContainer.innerHTML = userName;

}

/*
* check user login form actions
*/
let checkLogin = () => {

    let userInputName = document.getElementById("username").value.toLowerCase();
    let userINputPassword = document.getElementById("password").value;

    const user = USERS.find(item => item.name === userInputName);

        if(user && user.name === userInputName){

            errorMessage(false)

            if(userINputPassword == user.secret){

                let cookieValue = {
                    value: 1, username: user.name
                }
                cookieValue = JSON.stringify(cookieValue);
   
                setCookie("userLogin", cookieValue, 365);

                let myCookie = getCookie('userLogin');

                if(typeof myCookie !== 'undefined'){

                    checkUserisLoggedin();

                }

            }

        } else {
            errorMessage(true);
        }
}

/*
* check user is logged in
*/
let checkUserisLoggedin = () => {
    myCookie = decodeURIComponent(myCookie);
    myCookie = JSON.parse(myCookie);
    if (1 === myCookie.value) {
        //get username and call weclome user function
        const userName = myCookie.username;
        welcomeUser(userName);
    }
}


/*
* check if cookie is set and call checkUserisLoggedin function
*/

let myCookie = getCookie('userLogin');
if(typeof myCookie !== 'undefined'){
    checkUserisLoggedin();
}

/*
* event listener for login form
*/
loginModal.addEventListener("submit", (e) => {
    checkLogin();
    e.preventDefault();
})

/*
* event listener for logout and delete cookie
*/
logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    deleteCookie("userLogin");
    location.reload();
})




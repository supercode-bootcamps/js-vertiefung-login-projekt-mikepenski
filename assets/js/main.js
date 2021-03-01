"use strict";

const USERS = [ 
    { name: "supercode", secret: "no_one_will_know" },
    { name: "music_fan_1990", secret: "WeAreTheChampi0ns" },
    { name: "admin", secret: "1234" },
];


const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const loginUserName = document.getElementById("username");
//const loginPassword = document.getElementById("password");
const loginModalSubmit = document.getElementById("submit");
const logoutLink = document.getElementById("log-out")


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

function deleteCookie(name) { setCookie(name, '', -1); }


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
* check user login
*/
let checkLogin = () => {

    let userInputName = document.getElementById("username").value;
    let userINputPassword = document.getElementById("password").value;

    const user = USERS.find(item => item.name === userInputName);

        if(user && user.name === userInputName){

            errorMessage(false)

            if(userINputPassword == user.secret){
                console.log("success");
                document.cookie = 'userLogin=1; path=/;';
                //setCookie("userLogin", 1, 365)
                if ('1' === getCookie('userLogin')) {
                    console.log("test");
                    loginModal.classList.add("d-none")
                }
            }

        } else {
            errorMessage(true)
        }
}


loginModal.addEventListener("submit", (e) => {
    //USERS.find(checkLogin);
    checkLogin();
    e.preventDefault();
})





logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    deleteCookie("userLogin");
    location.reload();
})




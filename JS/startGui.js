// LOGIN / SIGNUP PAGE

// HTML Global Variables
let signInBtn = document.getElementById("signInBtn");
let signUpBtn = document.getElementById("signUpBtn");
let canvas = document.getElementById("myCanvas");

// Member List Array
let user = loadUser()

// Event Listener for the Sign In Button
signInBtn.addEventListener("click", signInHandler);

// What To React With If The User Presses Sign In Button
function signInHandler() {
    let logInput = document.getElementById("signInUser").value;
    let passInput = document.getElementById("signUpUser").value;
    for (let i = 0; i < user.length; i++) {
        if (logInput === user[i].userName && passInput === user[i].userPass) {
            alert("You have logged in!")
            canvas.classList.remove("hidden");
            return i;
        }
    } alert("Incorrect Username or Password");
}

function saveUser() {
    localStorage.setItem("user", JSON.stringify(user));
}

function loadUser() {
    let userStr = localStorage.getItem("user");
    return JSON.parse(userStr) ?? [];
}

function newUser(userUsername, userPassword) {
    return {
        userName: userUsername,
        userPass: userPassword,
    }
}

function checkUserInput(username, password) {
    for (let i = 0; i < user.length; i++) {
        if (user === user[i].userName) {
            alert("This Username Is Already In Use!")
            return i;
        }
    }
    user.push(newUser(username, password));
    alert("You Have Successfully Signed In!")
    return i;
}

function checkPassInput()
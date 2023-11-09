window.onload = setTimeout(verifySession, 1000)

function verifySession() {
    console.log("[VerifySession] : Attempting connection with server")
  fetch('http://localhost:3000/status')
  .then((response) => response.json())
  .then((data) => {
    if (data.status == "Online") {
    let userCreds = localStorage.getItem("client-credentials")
    if (!userCreds) {
    updateInterface("welcomeInterface", true)
    } else {
    //login-verficiation logic (to be added later)
    }
    }
  })
  .catch((error) => {
    console.log("[VerifySession] : Connection failed, re-try in 10 seconds")
    updateInterface("errorInterface", true)
    setTimeout(verifySession, 10000)
  });
}

function updateInterface(type, state) {
    if (state === true) {
        document.getElementById(type).classList.add("is-active")
    } else if (state === false) {
        document.getElementById(type).className = "modal"
    }
}

function signUp() {
    updateInterface("welcomeInterface", false)
    updateInterface("signupInterface", true)
}

function logIn() {
    updateInterface("welcomeInterface", false)
    updateInterface("loginInterface", true)
}
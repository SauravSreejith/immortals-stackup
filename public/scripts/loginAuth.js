let authServer = "http://localhost:3000"

function verifySession() {
    console.log("[loginAuth] : Attempting connection with server")
  fetch(`${authServer}/status`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    updateInterface("errorInterface", false)
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
    console.log("[loginAuth] : Connection failed, re-try in 10 seconds")
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

function signupInterface() {
    updateInterface("welcomeInterface", false)
    updateInterface("signupInterface", true)
}

function loginInterface() {
    updateInterface("welcomeInterface", false)
    updateInterface("loginInterface", true)
}

function signUp() {
  let input_username = document.getElementById("signup-username-input").value
  let input_password = document.getElementById("signup-password-input").value


  const userData = {
  username: input_username,
  password: input_password
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(userData)
  };


  fetch(`${authServer}/auth/signup`, requestOptions)
   .then((response) => {
      if (response.ok) {
       console.log("[loginAuth] : Successfully posted data")
        return response.json(); 
     } else {
       window.alert("Sign Up failed")
       throw new Error('POST request failed');
      }
   })
    .then((data) => {
      console.log(data);
   })
   .catch((error) => {
     // Handle any errors that occurred during the request
     console.error(error);
   });

}

/*
Next thing to do: manage serverside dataside data handling

 */
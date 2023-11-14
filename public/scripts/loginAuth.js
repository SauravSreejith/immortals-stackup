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
    let usercred_json = JSON.parse(userCreds)
    if (!userCreds) {
    updateInterface("welcomeInterface", true)
    } else {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: userCreds
        };
      
        fetch(`${authServer}/auth/hashVerify`, requestOptions)
        .then(response => response.json()).then(data => {
          if (data.auth == true) {
            showToast(`Logged in 👍 as ${usercred_json.name}`, "is-success", 5000)
            fetchTasks()
          } else if (data.auth == false) {
            showToast("Log in failed, Please re-login", "is-danger", 5000)
            localStorage.removeItem("client-credentials")
            updateInterface("loginInterface", true)
          }
        }).catch(error => {
        window.alert('Error during Login Verification');
        location.reload()
        });   
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
  buttonLoading("signup-button")
  let input_username = document.getElementById("signup-username-input").value
  let input_password = document.getElementById("signup-password-input").value

  document.getElementById("signup-username-error").innerText = ""
  document.getElementById("signup-password-error").innerText = ""


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
      if (data.status == 0) {
        showToast("User created successfully", "is-warning", 4500)
        updateInterface("signupInterface", false)
        setTimeout(() => updateInterface("loginInterface", true), 1500)
      } else if (data.status == 1) {
        if (data.type == "username") {
          return document.getElementById("signup-username-error").innerText = data.comments
        } else if (data.type == "password") {
          return document.getElementById("signup-password-error").innerText = data.comments
        }
      }
   })
   .catch((error) => {
     // Handle any errors that occurred during the request
     console.error(error);
   });

}

function logIn() {
  buttonLoading("login-button")
  let input_username = document.getElementById("login-username-input").value
  let input_password = document.getElementById("login-password-input").value

  document.getElementById("login-username-error").innerText = ""
  document.getElementById("login-password-error").innerText = ""


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


  fetch(`${authServer}/auth/login`, requestOptions)
   .then((response) => {
      if (response.ok) {
       console.log("[loginAuth] : Successfully posted data")
        return response.json(); 
     } else {
       window.alert("Log In failed")
       throw new Error('POST request failed');
      }
   })
    .then((data) => {
      if (data.state == "login_success") {
        localStorage.setItem('client-credentials', JSON.stringify({ name: data.username, hash: data.hash }));
        showToast("Login Successful 👍", "is-success", 5000)
        updateInterface("welcomeInterface", false)
        updateInterface("signupInterface", false)
        updateInterface("loginInterface", false)
      } else if (data.state == "login_failed") {
        showToast("Login Failed", "is-danger", 5000)
      } else if (data.state == 1) {
        if (data.type == "username") {
          return document.getElementById("login-username-error").innerText = data.comments
        } else if (data.type == "password") {
          return document.getElementById("login-password-error").innerText = data.comments
        }
      }
   })
   .catch((error) => {
     console.error(error);
   });


}

function logOut() {
  showToast("👍 Logging you out", "is-info", 3000)

  setTimeout(() => {
    localStorage.removeItem("client-credentials")
    location.reload()
  }, 3000)
}
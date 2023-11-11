function buttonLoading(button_id) {
    let button = document.getElementById(button_id)
    let originalClass = button.className
    button.classList.add("is-loading")
    setTimeout(() => {button.className = originalClass}, 2000)
}


function showToast(msg, typ, dur) {
    bulmaToast.toast({
        message: msg,
        type: typ,
        duration: dur, // Duration in milliseconds
        position: 'bottom-right',
        closeOnClick: true
    });
    
}

function heartBeat() {
  fetch(`${authServer}/status`)
  .then((response) => response.json())
  .then((data) => {
    if (data.status == "Online") return console.log("[Server Status] : Everything OK 👍")
  })
  .catch((error) => {
    console.log("[Server Status] Connection failed")
    showToast("Server is offline", "is-danger", 14000)
  });
}
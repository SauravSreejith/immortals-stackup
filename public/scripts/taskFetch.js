function fetchTasks() {
    let userCreds = localStorage.getItem("client-credentials")
      
    const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json', 
        },
        body: userCreds
    };

    fetch(`${authServer}/tasks/get`, requestOptions)
        .then(response => response.json()).then(data => {
            document.getElementById("scroll-list").innerHTML = ""
            if (data.tasklist) {
                data.tasklist.forEach(task => {
                    appendTaskToScrollList(task.id, task.description)                   
                });
            }
        }).catch(error => { window.alert("An error occured")})

}

function storeTask(task_description, task_id) {
    let userCreds = localStorage.getItem("client-credentials")
    let usercred_json = JSON.parse(userCreds)

    let values = {
        name: usercred_json.name,
        hash: usercred_json.hash,
        content: task_description,
        id: task_id
    }
      
    const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json', 
        },
        body: JSON.stringify(values)
    };

    fetch(`${authServer}/tasks/create`, requestOptions)
        .then(response => response.json()).then(data => {
            fetchTasks()
            return console.log(data)

        }).catch(error => { window.alert("An error occured")})

}

function deleteTask(task_id) {
    let userCreds = localStorage.getItem("client-credentials")
    let usercred_json = JSON.parse(userCreds)

    let values = {
        name: usercred_json.name,
        hash: usercred_json.hash,
        id: task_id
    }
      
    const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json', 
        },
        body: JSON.stringify(values)
    };

    fetch(`${authServer}/tasks/delete`, requestOptions)
        .then(response => response.json()).then(data => {
            return console.log(data)
        }).catch(error => { window.alert("An error occured")})
}
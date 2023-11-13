
function appendTaskToScrollList(id, description) {
    // Create main container div
    var newTaskDiv = document.createElement("div");
    newTaskDiv.classList.add("box");
    newTaskDiv.id = "taskDisplay"
    newTaskDiv.setAttribute("data-taskID", id);
  
    // Create columns div
    var columnsDiv = document.createElement("div");
    columnsDiv.classList.add("columns");
  
    // Column 1: Checkbox
    var column1Div = document.createElement("div");
    column1Div.classList.add("column", "is-narrow");
  
    var checkboxDiv = document.createElement("div");
    checkboxDiv.classList.add("box");
    checkboxDiv.style.cssText = "width: 20px; background-color: transparent; box-shadow: none;";
  
    var checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("data-taskID", id);
    checkboxInput.type = "checkbox";
    checkboxInput.id = "task" + id;
    checkboxInput.onclick = function () {
      strikeOut(this);
    };
  
    checkboxDiv.appendChild(checkboxInput);
    column1Div.appendChild(checkboxDiv);
  
    // Column 2: Description
    var column2Div = document.createElement("div");
    column2Div.classList.add("column");
  
    var descriptionBox = document.createElement("div");
    descriptionBox.classList.add("box");
    descriptionBox.style.cssText = "background-color: transparent; box-shadow: none; height: 20vh; overflow-y: auto;";
  
    var descriptionText = document.createElement("b");
    descriptionText.setAttribute("data-taskID", id);
    descriptionText.id = "task-description";
    descriptionText.innerText = description;
  
    descriptionBox.appendChild(descriptionText);
    column2Div.appendChild(descriptionBox);
  
    // Column 3: Delete Button
    var column3Div = document.createElement("div");
    column3Div.classList.add("column", "is-narrow");
  
    var deleteButtonBox = document.createElement("div");
    deleteButtonBox.classList.add("box");
    deleteButtonBox.style.cssText = "width: 20px;background-color: transparent; box-shadow: none;";
  
    var deleteButton = document.createElement("button");
    deleteButton.classList.add("card-header-icon");
    deleteButton.style.cssText = "display: flex; flex-direction: column;";
  
    var deleteIconContainer = document.createElement("div");
    deleteIconContainer.setAttribute("data-taskID", id);
    deleteIconContainer.classList.add("icon-container");
    deleteIconContainer.onclick = function () {
      deleteTask(this);
    };
  
    var deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    deleteIcon.style.color = "#5A189A";
  
    deleteIconContainer.appendChild(deleteIcon);
    deleteButton.appendChild(deleteIconContainer);
    deleteButtonBox.appendChild(deleteButton);
    column3Div.appendChild(deleteButtonBox);
  
    // Append columns to the main container
    columnsDiv.appendChild(column1Div);
    columnsDiv.appendChild(column2Div);
    columnsDiv.appendChild(column3Div);
  
    // Append the new task div to the scroll list
    newTaskDiv.appendChild(columnsDiv);
    document.getElementById("scroll-list").appendChild(newTaskDiv);
  }

function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
  
    return randomId;
  }  


function deleteTask(button) {
    let taskid = button.getAttribute("data-taskid")

        let allElements = document.querySelectorAll('[data-taskID="'+taskid+'"]');
        let box = [...allElements].find(e => e.className == "box")
        box.remove()

}

function strikeOut(checkbox) {
  if (checkbox.checked) {
    let taskid = checkbox.getAttribute("data-taskid")
    let allElements = document.querySelectorAll('[data-taskID="'+taskid+'"]');
    let description = [...allElements].find(e => e.id == "task-description")
    description.innerHTML = `<s>${description.innerHTML}</s>`
    
  } else {
    let taskid = checkbox.getAttribute("data-taskid")
    let allElements = document.querySelectorAll('[data-taskID="'+taskid+'"]');
    let description = [...allElements].find(e => e.id == "task-description")
    description.innerHTML = description.innerHTML.replace("<s>", "").replace("</s>", "")
  }
}

function refreshTasks() {
  console.error()
}

function newTask() {
  let newTask = document.getElementById("newtask-input")
  if (!newTask.value) return cancelTaskInput()
  let randomId = generateRandomId(5)
  appendTaskToScrollList(randomId, newTask.value)
  newTask.value = ""
  updateInterface("inputInterface", false)
}

function cancelTaskInput() {
  updateInterface("inputInterface", false)
}

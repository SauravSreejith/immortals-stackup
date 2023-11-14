const express = require("express")
const cors = require('cors');
const crypto = require('crypto');

const { QuickDB } = require("quick.db");
const db = new QuickDB();

(async () => {
    if (!(await db.get("Users"))) {
      db.set("Users", []);
    }
})();



const app = express ();
app.use(cors());
app.use(express.json());

const port = 3000

function isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; 
    return usernameRegex.test(username);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

async function hashString(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

function cleanInput(input) { return input.replace(/[^\w]/g, '');}

app.listen(port, () => { 
    console.log("Started Server on Port: ", port);
});

app.get("/status", (request, response) => response.send({ status: "Online"}))

app.post("/auth/signup", async (req, res) => {

    if (!req.body.username || req.body.username.length < 1 ) return res.send({ status: 1, type: "username", comments: "Invalid or Blank Username"})
    if (!req.body.password || req.body.password.length < 1) return res.send({ status: 1, type: "password", comments: "Invalid or Blank Password"})

    let resObj = { level : 0}

    if (isValidUsername(req.body.username)) {
        resObj.level++
        resObj.username = req.body.username     
    } else return res.send({ status: 1, type: "username", comments: "Only letters, numbers, and underscores are allowed. Maximum 3 to 20 characters"})

    if (isValidPassword(req.body.password)) {
       resObj.level++
       resObj.password = req.body.password
    } else return res.send({ status: 1, type: "password", comments: "At least 8 characters, with a mix of uppercase, lowercase, numbers, and symbols"})

    if (resObj.level == 2) {
        db.get("Users").then(users => {
            const foundUser = users.find(user => user.username.toLowerCase() === resObj.username.toLowerCase());
            if (foundUser) return res.send({ status: 1, type: "username", comments: "User already exists"})
        });

        let user = {
            username : resObj.username.toLowerCase(),
        }

        hashString(resObj.password).then(h => user.password = h)
        await db.push("Users", user)
        return res.send({ status: 0, type: "user_created", comments: ""})
    } else return res.send({ status: 1, type: "username", comments: "An error occured, please try again"}) 

})

app.post("/auth/login", async (req, res) => {
    if (!req.body.username || req.body.username.length < 1 ) return res.send({ state: 1, type: "username", comments: "Invalid or Blank Username"})
    if (!req.body.password || req.body.password.length < 1) return res.send({ state: 1, type: "password", comments: "Invalid or Blank Password"})


    let usr = cleanInput(req.body.username.toLowerCase())
    let pass = req.body.password

    db.get("Users").then(async users => {
        let person = users.find(user => user.username == usr)

        if (!person) return res.send({ state: "login_failed" })

        let pwd = await hashString(pass)

        if (person.password == pwd) { return res.send({ state: "login_success", username: person.username, hash: person.password })} else return res.send({ state: "login_failed" })
    })
})

app.post("/auth/hashVerify", async (req, res) => {
    db.get("Users").then(async users => {
        let person = users.find(user => user.username == req.body.name)

        if (!person) return res.send({ auth: false })

        if (person.password == req.body.hash) { return res.send({ auth: true })} else res.send({ auth: false })
    })

})


app.post("/tasks/get", async (req, res) => {
    db.get("Users").then(async users => {
        let person = users.find(user => user.username == req.body.name)


        if (!person) return
        if (person.password !== req.body.hash) return

        db.get(`tasks.${person.username}`).then(tasks => {
            if (tasks) return res.send({ tasklist: tasks })
        })
    })
})

app.post("/tasks/create", async (req, res) => {
    db.get("Users").then(async users => {
        let person = users.find(user => user.username == req.body.name)

        if (!person) return
        if (person.password !== req.body.hash) return

        let saveData = { description: req.body.content, id: req.body.id}

        db.push(`tasks.${person.username}`, saveData)
        return res.send({ status: "success"})
    })
})

app.post("/tasks/delete", async (req, res) => {
    db.get("Users").then(async users => {
        let person = users.find(user => user.username == req.body.name)

        if (!person) return
        if (person.password !== req.body.hash) return

        let storedArray = await db.get(`tasks.${person.username}`)


        const indexToDelete = storedArray.findIndex(entry => entry.id === req.body.id);

        if (indexToDelete !== -1) {
            storedArray.splice(indexToDelete, 1);
            db.set(`tasks.${person.username}`, storedArray);
        }


    })
})
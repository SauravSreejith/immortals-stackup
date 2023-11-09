const express = require("express")
const cors = require('cors');

const app = express ();
app.use(cors());
app.use(express.json());

const port = 3000 //dev server port !Change before deployment

app.listen(port, () => { console.log("Started Server on Port: ", port); });

app.get("/status", (request, response) => response.send({ status: "Online"}))

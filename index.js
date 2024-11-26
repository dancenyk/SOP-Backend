const express = require("express")
const app = express()
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const {dbConnection} = require("./config/db")

dbConnection(); 

app.listen(PORT, ()=>{
    console.log(`Express está escuchando en el puerto http://localhost:${PORT}`)
})

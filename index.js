const express = require("express")
const app = express()
const cors = require("cors")
require('dotenv').config();
const admin= require("firebase-admin")

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const profileRoutes = require("./routes/profile")
const postsRoutes = require("./routes/posts")
const {dbConnection} = require("./config/db")

const PORT = process.env.PORT || 8080;


app.use("/", profileRoutes)
app.use("/",postsRoutes )

dbConnection(); 

app.listen(PORT, ()=>{
    console.log(`Express está escuchando en el puerto http://localhost:${PORT}`)
})

const express = require("express");
const dotenv = require('dotenv')
const mongoose = require('mongoose')
// const cors = require("cors")
const app = express();
const cookiePerser = require('cookie-parser')

// app.use(cors());
app.use(cookiePerser())
dotenv.config({ path: "src/config.env" });

const PORT = process.env.PORT || 8000

const userRoutes = require("../route/user");
app.use(express.json());

app.use("/user", userRoutes)

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Database Connected")
}).catch((error) => {
    console.log(error)
})

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`server run on port ${PORT}`)
})
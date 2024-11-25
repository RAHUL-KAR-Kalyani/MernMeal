const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// file imports
const mongoDb = require('./db');
const router = require('./Routes/CreateUser');

const app = express();  //  Creating an Express Application
const PORT = process.env.PORT || 5000;      //  Port Configuration


// middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept"
    );
    next();
})
app.use(cors());
app.use(express.json());
app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api', require("./Routes/OrderData"))
// app.use(router)

// app.use(express.static("public"))
// app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "ejs");   // Set EJS as the view engine
// app.use(session({       /* declear middleware session */
//     secret: process.env.SECRET_KEY,
//     store: store,
//     resave: false,
//     saveUninitialized: false
// }))



// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

mongoDb()   // db connection
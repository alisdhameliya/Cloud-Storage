const express = require("express");
const dotenv = require("dotenv/config");
const cors = require("cors");
const { Connection } = require("./db/connection");
const routes = require("./routes/file-route");

const app = express();
app.use(express.json());
app.use(cors());

const MONGODB_URI = process.env.MONGODB_URI;

app.use("/", routes);

app.use((error, req, res, next) => {
    if(error.code === "ECONNRESET") {
        console.error("Page Refreshed by User.\n", error);
        res.status(502).send({ message: "Page Refreshed by User." })
    } 
    else {
        console.error("Unhandled Error.\n", error);
        res.status(error.status || 500).send({ message: error.message || "Internal Server Error" });
    }
});

// Database Connection
Connection(MONGODB_URI);

const PORT = process.env.PORT;

// Server Running
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
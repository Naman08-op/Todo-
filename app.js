const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
var morgan = require("morgan");
const url = "mongodb://localhost/NamanDBex";
const app = express();

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("CONNECTED....");
});

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

const todoRouter = require("./routes/todos");
app.use("/todo", todoRouter);

app.listen(9000, () => {
  console.log("SERVER STARTED");
});

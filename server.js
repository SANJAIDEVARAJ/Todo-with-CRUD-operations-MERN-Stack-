const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = express.Router();
const serveStatic = require("serve-static");
const path = require("path");
const PORT = process.env.PORT || 4000;

let Todo = require("./todo.model");

app.use(cors());
app.use(bodyParser.json());

const MONGOD_URL =
  process.env.DB /*|| "mongodb://localhost:27017/local_todo"*/;

mongoose.connect(MONGOD_URL, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.use(serveStatic(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});


//Loads the tasks
todoRoutes.route("/").get(function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Todo.findById(id, function (err, todo) {
    res.json(todo);
  });
});

//Adds the tasks
todoRoutes.route("/add").post(function (req, res) {
  console.log(req);
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new todo failed");
    });
});


//Updating the tasks
todoRoutes.route("/update/:id").post(function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (!todo) res.status(404).send("data is not found");
    else todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;

    todo
      .save()
      .then((todo) => {
        res.json("Todo updated");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});


//Deleting the tasks
todoRoutes.route("/").delete((req, res) => {
  Todo.deleteOne({ _id: req.query.id }, (err) => {
    if (err) {
      res.status(400).send("Todo not deleted");
    }

    res.json("Todo deleted");
  });
});

app.use("/todos", todoRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

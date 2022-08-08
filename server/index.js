const express = require("express");
const app = express();
// const app = require("express")();

const pool = require("./db");

const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = 5000;

// ROUTES

// create a ToDo
app.post("/todos", async (req, res) => {
  try {
    // console.log(req.body);
    const { description } = req.body;
    const data = await pool.query(
      `INSERT INTO todo (description) VALUES($1) RETURNING *`,
      [description]
    );
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

// GET all Todos
app.get("/todos", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM todo");
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

// GET one Todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query(`SELECT * FROM todo WHERE todo_id = $1`, [
      id,
    ]);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

// DELETE a Todo

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}!`);
});

// STEP 1: setup express and cors
// const express = require("express");
// const app = express();
// // const app = require("express")();

// const cors = require("cors");

// app.use(cors());
// app.use(express.json());

// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`server running on port ${PORT}!`);
// });

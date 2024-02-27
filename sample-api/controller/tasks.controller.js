const fs = require("fs");
const postgres = require("postgres");
require("dotenv").config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGDATABASE = decodeURIComponent(PGDATABASE);

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

const getTasks = async (req, res) => {
  const result = await sql`select * from task1`;
  res.json(result);
};

const createTasks = async (req, res) => {
  const { title } = req.body;
  await sql`insert into task1(id, title) values(${Date.now()}, ${title})`;
  res.json([{ status: "Success" }]);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  await sql`update task1 set title = ${title} where id = ${id}`;

  res.json([{ status: "Success" }]);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  await sql`delete from task1 where id = ${id}`;
  res.json([{ status: "Success" }]);
};
module.exports = {
  getTasks,
  createTasks,
  updateTask,
  deleteTask,
};

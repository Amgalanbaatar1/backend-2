import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTask] = useState([]);

  function loadTasks() {
    axios.get("http://localhost:3000/tasks").then((response) => {
      setTask(response.data);
    });
  }
  useEffect(() => {
    loadTasks();
  }, []);

  function createNewTask() {
    const title = prompt("Task Name?");
    if (!title) {
      alert("Please Enter Add Task");
      return;
    }
    axios
      .post("http://localhost:3000/tasks/create", {
        title,
      })

      .then(() => {
        loadTasks();
      });
  }
  function editTask(task) {
    const editedTitle = prompt("Task name?", task.title);

    axios
      .put(`http://localhost:3000/tasks/update/${task.id}`, {
        title: editedTitle,
      })

      .then(() => {
        loadTasks();
      });
  }

  function deleteTask(id) {
    if (confirm("Delete?")) {
      axios.delete(`http://localhost:3000/tasks/delete/${id}`).then(() => {
        loadTasks();
      });
    }
  }
  return (
    <main className="container items-center justify-center flex mx-auto my-10 mb-10px flex-col ">
      <button className="mb-2 btn btn-primary" onClick={createNewTask}>
        Add task
      </button>
      {tasks.map((task) => (
        <div key={task.id} className="card w-96 bg-base-100 shadow-xl mb-5">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-1">{task.title}</div>
              <button className="btn btn-ghost btn-sm" onClick={() => editTask(task)}>
                Edit
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}

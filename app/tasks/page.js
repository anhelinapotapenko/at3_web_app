// tasks/page.js

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const BASE_URL = "https://myjamjar.com.au/v1";

const headers = {
  Authorization: "Bearer 199|RogHafvvGeA4TT1m44WB5wyy57WGxYRWQ1jNSW0t8acb118b",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Integration-Name": "NMT-204782",
  "Workspaces-Identifier": "tenant-pm-009",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  // load tasks when page opens
  useEffect(() => {
    async function getTasks() {
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: "GET",
        headers: headers,
      });
      // convert json response into js
      const data = await response.json();

      setTasks(data);
    }

    getTasks();
  }, []);
  // function to delete a task
  const deleteTask = async (id) => {
    // to confirm
    const confirmed = confirm("Do you want to delete this task?");
    /// stop if user clicks cancel
    if (!confirmed) {
      return;
    }
    // send DELETE request
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: headers,
    });
    // remove deleted task from the page
    if (response.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
    } else {
      alert("Task was not deleted");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="title">Tasks</h1>

      <Link href="/tasks/create" className="button is-success mb-4">
        Create Task
      </Link>

      {tasks.map((task) => (
        <div key={task.id} className="box">
          <p>
            <strong>ID:</strong> {task.id}
          </p>

          <p>
            <strong>Name:</strong> {task.name}
          </p>
          <p>
            <strong>Project Name:</strong> {task.project.name}
          </p>
          <p>
            <strong>Description:</strong> {task.description}
          </p>
          <br></br>
          <Link href={`/tasks/${task.id}`} className="button is-primary">
            View
          </Link>

          <Link
            href={`/tasks/${task.id}/edit`}
            className="button is-warning ml-2"
          >
            Edit
          </Link>

          <button
            className="button is-danger ml-2"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

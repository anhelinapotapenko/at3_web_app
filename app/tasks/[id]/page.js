// tasks/[id]/page.js

import Link from "next/link";

const BASE_URL = process.env.API_BASE_URL;

const headers = {
  Authorization: `Bearer ${process.env.API_TOKEN}`,
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Integration-Name": "NMT-204782",
  "Workspaces-Identifier": "tenant-pm-009",
};

export default async function TaskDetailsPage({ params }) {
  // get the task id from the url
  const { id } = await params;
  // fetch all tasks from the API
  const response = await fetch(`${BASE_URL}/tasks`, {
    headers,
    cache: "no-store",
  });
  // convert json response into js
  const tasks = await response.json();
  // find the task by id in url
  const task = tasks.find((task) => task.id === id);
  // display error if the task cannot be found
  if (!task) {
    return (
      <>
        <h1 className="title">Task not found</h1>

        <Link className="button is-light" href="/tasks">
          Back
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="title">Task Details</h1>

      <div className="box">
        <p>
          <strong>ID:</strong> {task.id}
        </p>

        <p>
          <strong>Name:</strong> {task.name}
        </p>

        <p>
          <strong>Description:</strong> {task.description}
        </p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>

        <p>
          <strong>Due Date:</strong> {task.due_date}
        </p>
        <p>
          <strong>Project Name:</strong> {task.project.name}
        </p>

        <p>
          <strong>Assigned to:</strong> {task.assigned_to.name}
        </p>

        <p>
          <strong>Assigned to :</strong> {task.assigned_to.email.name}
        </p>

        <p>
          <strong>Created by:</strong> {task.created.human}
        </p>

        <p>
          <strong>Project Name:</strong> {task.project.name}
        </p>
      </div>

      <Link className="button is-warning" href={`/tasks/${task.id}/edit`}>
        Edit
      </Link>

      <Link className="button is-light ml-2" href="/tasks">
        Back
      </Link>
    </>
  );
}

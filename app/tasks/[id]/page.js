// tasks/[id]/page.js

import Link from "next/link";

const BASE_URL = "https://myjamjar.com.au/v1";

const headers = {
  Authorization: "Bearer 199|RogHafvvGeA4TT1m44WB5wyy57WGxYRWQ1jNSW0t8acb118b",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Integration-Name": "NMT-204782",
  "Workspaces-Identifier": "tenant-pm-009",
};

export default async function TaskDetailsPage({ params }) {
  // get the task id from the url
  const { id } = await params;
  // fetch all tasks from the API
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    headers,
    cache: "no-store",
  });
  // convert json response into js
  const task = await response.json();

  // display error if the task cannot be found
  if (!task || task.message) {
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
          <strong>Assigned to:</strong>{" "}
          {task.assigned_to?.name || "No assigned user"}
        </p>

        <p>
          <strong>Assigned Email:</strong>{" "}
          {task.assigned_to?.email?.address || "No email"}
        </p>

        <p>
          <strong>Created by:</strong> {task.created.human}
        </p>

        <p>
          <strong>Project Name:</strong> {task.project?.name || "No project"}
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

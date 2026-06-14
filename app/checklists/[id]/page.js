// checklists/[id]/page.js

import Link from "next/link";

const BASE_URL = "https://myjamjar.com.au/v1";

const headers = {
  Authorization: "Bearer 199|RogHafvvGeA4TT1m44WB5wyy57WGxYRWQ1jNSW0t8acb118b",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Integration-Name": "NMT-204782",
  "Workspaces-Identifier": "tenant-pm-009",
};

export default async function ChecklistDetailsPage({ params }) {
  const { id } = await params;

  const response = await fetch(`${BASE_URL}/checklist-items`, {
    method: "GET",
    headers: headers,
    cache: "no-store",
  });

  if (!response.ok) {
    return (
      <>
        <h1 className="title">Checklist API error</h1>
        <p>Could not load checklist details.</p>

        <Link className="button is-light" href="/checklists">
          Back
        </Link>
      </>
    );
  }

  const data = await response.json();

  const checklists = Array.isArray(data) ? data : data.data || [];

  const checklist = checklists.find((checklist) => checklist.id === id);

  if (!checklist) {
    return (
      <>
        <h1 className="title">Checklist not found</h1>

        <Link className="button is-light" href="/checklists">
          Back
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="title">Checklist Details</h1>

      <div className="box">
        <p>
          <strong>ID:</strong> {checklist.id}
        </p>

        <p>
          <strong>Label:</strong> {checklist.label}
        </p>

        <p>
          <strong>Completed:</strong> {checklist.completed ? "Yes" : "No"}
        </p>

        <p>
          <strong>Task ID:</strong> {checklist.task_id || "No task"}
        </p>
      </div>

      <Link
        className="button is-warning"
        href={`/checklists/${checklist.id}/edit`}
      >
        Edit
      </Link>

      <Link className="button is-light ml-2" href="/checklists">
        Back
      </Link>
    </>
  );
}

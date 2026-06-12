// checklists/[id]/page.js

import Link from "next/link";

const BASE_URL = process.env.API_BASE_URL;

const headers = {
  Authorization: `Bearer ${process.env.API_TOKEN}`,
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Integration-Name": "NMT-204782",
  "Workspaces-Identifier": "tenant-pm-009",
};

export default async function ChecklistDetailsPage({ params }) {
  const { id } = await params;

  const response = await fetch(`${BASE_URL}/checklist-items`, {
    headers,
    cache: "no-store",
  });

  const data = await response.json();

  const checklists = Array.isArray(data) ? data : [];

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
          <strong>Task ID:</strong> {checklist.task_id}
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

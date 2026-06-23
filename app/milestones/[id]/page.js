// milestones/[id]/page.js

import Link from "next/link";

const BASE_URL = "https://myjamjar.com.au/v1";

const headers = {
  Authorization: "Bearer 199|RogHafvvGeA4TT1m44WB5wyy57WGxYRWQ1jNSW0t8acb118b",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Integration-Name": "NMT-204782",
  "Workspaces-Identifier": "tenant-pm-009",
};

export default async function MilestoneDetailsPage({ params }) {
  // get the milestone id from the url
  const { id } = await params;
  // fetch all milestones from the API
  const response = await fetch(`${BASE_URL}/milestones/${id}`, {
    headers,
    cache: "no-store",
  });
  // convert json response into js
  const milestone = await response.json();

  // display error if the milestone cannot be found
  if (!milestone || milestone.message) {
    return (
      <>
        <h1 className="title">Milestone not found</h1>

        <Link className="button is-light" href="/milestones">
          Back
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="title">Milestone Details</h1>

      <div className="box">
        <p>
          <strong>ID:</strong> {milestone.id}
        </p>

        <p>
          <strong>Title:</strong> {milestone.title}
        </p>

        <p>
          <strong>Description:</strong>{" "}
          {milestone.description || "No description"}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {milestone.completed_at ? "Completed" : "Pending"}
        </p>

        <p>
          <strong>Due Date:</strong> {milestone.due_date || "No due date"}
        </p>

        <p>
          <strong>Project Name:</strong>{" "}
          {milestone.project?.name || "No project"}
        </p>

        <p>
          <strong>Assigned to:</strong>{" "}
          {milestone.assigned_to?.name || "No assigned user"}
        </p>

        <p>
          <strong>Assigned Email:</strong>{" "}
          {milestone.assigned_to?.email?.address || "No email"}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {milestone.created?.human || "No created date"}
        </p>
      </div>

      <Link
        className="button is-warning"
        href={`/milestones/${milestone.id}/edit`}
      >
        Edit
      </Link>

      <Link className="button is-light ml-2" href="/milestones">
        Back
      </Link>
    </>
  );
}

// projects/[id]/page.js

import Link from "next/link";

const BASE_URL = "https://myjamjar.com.au/v1";

const headers = {
  Authorization: "Bearer 199|RogHafvvGeA4TT1m44WB5wyy57WGxYRWQ1jNSW0t8acb118b",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Integration-Name": "NMT-204782",
  "Workspaces-Identifier": "tenant-pm-009",
};

export default async function ProjectDetailsPage({ params }) {
  // get the project id from the url
  const { id } = await params;
  // fetch all projects from the API
  const response = await fetch(`${BASE_URL}/projects/${id}`, {
    headers,
    cache: "no-store",
  });
  // convert json response into js
  const project = await response.json();

  // display error if the project cannot be found
  if (!project || project.message) {
    return (
      <>
        <h1 className="title">Project not found</h1>

        <Link className="button is-light" href="/projects">
          Back
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="title">Project Details</h1>

      <div className="box">
        <p>
          <strong>ID:</strong> {project.id}
        </p>

        <p>
          <strong>Name:</strong> {project.name}
        </p>

        <p>
          <strong>Description:</strong> {project.description}
        </p>

        <p>
          <strong>Date:</strong> {project.created?.string}
        </p>
      </div>

      <Link className="button is-warning" href={`/projects/${project.id}/edit`}>
        Edit
      </Link>

      <Link className="button is-light ml-2" href="/projects">
        Back
      </Link>
    </>
  );
}

// projects/[id]/page.js

import Link from "next/link";

const BASE_URL = process.env.API_BASE_URL;

const headers = {
  Authorization: `Bearer ${process.env.API_TOKEN}`,
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Integration-Name": "NMT-204782",
  "Workspaces-Identifier": "tenant-pm-009",
};

export default async function ProjectDetailsPage({ params }) {
  const { id } = await params;

  const response = await fetch(`${BASE_URL}/projects`, {
    headers,
    cache: "no-store",
  });

  const projects = await response.json();

  const project = projects.find((project) => project.id === id);

  if (!project) {
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

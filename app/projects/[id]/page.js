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
// project details page component
export default async function ProjectsDetailsPage({ params }) {
  // get the project id from url
  const { id } = await params;
  // fetch all projects from the API
  const response = await fetch(`${BASE_URL}/projects`, {
    headers,
    // fetch fresh data insted of using cache
    cache: "no-store",
  });
  // convert JSON response into JavaScript
  const projects = await response.json();
  // fint the selected project by id in url
  const project = projects.find((project) => project.id === id);

  // if project cant be find - error
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

      <Link className="button is-light" href="/projects">
        Back
      </Link>
    </>
  );
}

// projects/page.js

import Link from "next/link";

const BASE_URL = "https://myjamjar.com.au/v1";

const headers = {
  Authorization: "Bearer 199|RogHafvvGeA4TT1m44WB5wyy57WGxYRWQ1jNSW0t8acb118b",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Integration-Name": "NMT-204782",
  "Workspaces-Identifier": "tenant-pm-009",
};

export default async function UsersPage() {
  const response = await fetch(`${BASE_URL}/projects`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const projects = await response.json();
  return (
    <div className="container mt-4 ">
      <h1 className="display-5 fw-bold text-primary text-center mb-4">
        Projects
      </h1>
      {projects.map((project) => (
        <div key={project.id} className="box">
          <p>
            <strong>Title:</strong> {project.name}
          </p>

          <p>
            <strong>ID:</strong> {project.id}
          </p>

          <p>
            <strong>Description:</strong> {project.description}
          </p>

          <Link href={`/projects/${project.id}`} className="btn btn-primary">
            View
          </Link>
        </div>
      ))}
    </div>
  );
}

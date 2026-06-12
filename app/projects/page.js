// projects/page.js

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  // load projects when page opens
  useEffect(() => {
    async function getProjects() {
      const response = await fetch(`${BASE_URL}/projects`, {
        method: "GET",
        headers: headers,
      });
      // convert json response into js
      const data = await response.json();

      setProjects(data);
    }

    getProjects();
  }, []);
  // function to delete
  const deleteProject = async (id) => {
    // to confrim
    const confirmed = confirm("Do you want to delete this project?");

    // stop if user clicks cancel
    if (!confirmed) {
      return;
    }
    // send DELETE request
    const response = await fetch(`${BASE_URL}/projects/${id}`, {
      method: "DELETE",
      headers: headers,
    });
    // remove deleted task from the page
    if (response.ok) {
      setProjects(projects.filter((project) => project.id !== id));
    } else {
      alert("Project was not deleted");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="title">Projects</h1>

      <Link href="/projects/create" className="button is-success mb-4">
        Create Project
      </Link>

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

          <br></br>
          <Link href={`/projects/${project.id}`} className="button is-primary">
            View
          </Link>

          <Link
            href={`/projects/${project.id}/edit`}
            className="button is-warning ml-2"
          >
            Edit
          </Link>

          <button
            className="button is-danger ml-2"
            onClick={() => deleteProject(project.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

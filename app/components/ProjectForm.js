// app/components/ProjectForm.js

"use client";

// import Link component for navigation
import Link from "next/link";

// import React hooks
import { useEffect, useState } from "react";

// import router for page redirection
import { useRouter } from "next/navigation";

// API URL
const BASE_URL = "https://myjamjar.com.au/v1";

// API headers
const headers = {
  Authorization: "Bearer 199|RogHafvvGeA4TT1m44WB5wyy57WGxYRWQ1jNSW0t8acb118b",

  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Integration-Name": "NMT-204782",
  "Workspaces-Identifier": "tenant-pm-009",
};

// reusable project form component, used for Create and Edit pages
export default function ProjectForm({ projectId }) {
  // router used to redirect after save
  const router = useRouter();

  // store project name
  const [name, setName] = useState("");

  // store project description
  const [description, setDescription] = useState("");

  // to store project data
  const [tasks, setTasks] = useState([]);

  // store error messages
  const [error, setError] = useState("");

  // store success message
  const [success, setSuccess] = useState("");

  // load project data when editing
  useEffect(() => {
    async function getProject() {
      // stop if creating a new project
      if (!projectId) {
        return;
      }

      // fetch all projects from API
      const response = await fetch(`${BASE_URL}/projects`, {
        method: "GET",
        headers: headers,
      });

      // convert json  into js
      const projects = await response.json();

      // find the selected project by id from the URL
      const project = projects.find((project) => project.id === projectId);

      // pre filled form
      if (project) {
        setName(project.name || "");
        setDescription(project.description || "");
      }
    }

    getProject();
  }, [projectId]);

  useEffect(() => {
    async function getProjectTasks() {
      if (!projectId) {
        return;
      }

      const response = await fetch(`${BASE_URL}/tasks`, {
        method: "GET",
        headers,
      });

      const data = await response.json();

      const projectTasks = data.filter(
        (task) => task.project?.id === projectId,
      );

      setTasks(projectTasks);
    }

    getProjectTasks();
  }, [projectId]);

  // run when the user submits the form
  const handleSubmit = async (event) => {
    // stop page refresh
    event.preventDefault();

    // errors message
    setError("");
    // success mesage
    setSuccess("");

    // validate project name
    if (name.trim() === "") {
      setError("Add project name");
      return;
    }

    // validate description
    if (description.trim() === "") {
      setError("Add project description");
      return;
    }

    // choose API endpoint
    // Edit → /projects/id
    // Create → /projects
    const url = projectId
      ? `${BASE_URL}/projects/${projectId}`
      : `${BASE_URL}/projects`;

    // choose HTTP method
    // PUT = update existing project
    // POST = create new project
    const method = projectId ? "PUT" : "POST";

    // send data to API
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    });

    // handle successful response
    if (response.ok) {
      // display success message
      setSuccess(
        projectId
          ? "Project was updated successfully!"
          : "Project was created successfully!",
      );
      // redirect back to projects page after 1.5 seconds
      setTimeout(() => {
        router.push("/projects");
      }, 1500);
    } else {
      // convert error response into JavaScript
      const data = await response.json();
      // display error in console for testing
      console.log("Project form error:", data);
      // show error message on page
      setError(data.message || "Project was not saved");
    }
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      {/* error message */}
      {error && <p className="notification is-danger">{error}</p>}
      {/* success message */}
      {success && <p className="notification is-success">{success}</p>}
      {/* project name field */}
      <div className="field">
        <label className="label">Enter Project Name</label>

        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Enter project name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
      </div>
      {/* project description field */}
      <div className="field">
        <label className="label">Description</label>

        <textarea
          className="textarea"
          placeholder="Enter description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </div>
      {/* to show tasks in project */}
      {projectId && (
        <div className="box">
          <h2 className="title is-5">Tasks in this Project</h2>

          {tasks.length === 0 && <p>No tasks found for this project.</p>}

          {tasks.map((task) => (
            <div key={task.id} className="notification is-light">
              <p>
                <strong>Task:</strong> {task.name}
              </p>

              <p>
                <strong>Status:</strong> {task.status}
              </p>

              <Link
                href={`/tasks/${task.id}`}
                className="button is-small is-info"
              >
                View Task
              </Link>
            </div>
          ))}
        </div>
      )}
      {/* save button */}
      <button className="button is-primary" type="submit">
        {/* button text changes depending on mode */}
        {projectId ? "Update Project" : "Create Project"}
      </button>
      {/* spacing */}
      <br />
      <br />
      {/* return to projects page */}
      <Link href="/projects" className="button is-link ml-2">
        Go to Project Page
      </Link>
    </form>
  );
}

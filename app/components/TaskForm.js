// app/components/TaskForm.js

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

// reusable task form component, used for Create and Edit pages
export default function TaskForm({ taskId }) {
  // router used to redirect after save
  const router = useRouter();

  // store task name
  const [name, setName] = useState("");

  // store task description
  const [description, setDescription] = useState("");

  // store task status
  const [status, setStatus] = useState("todo");

  // to store project data
  const [projects, setProjects] = useState([]);

  // to store project by id
  const [projectId, setProjectId] = useState("");

  // store error messages
  const [error, setError] = useState("");

  // store success message
  const [success, setSuccess] = useState("");

  // load taskdata when editing
  useEffect(() => {
    async function getTask() {
      // stop if creating a new task
      if (!taskId) {
        return;
      }

      // fetch all tasks from API
      const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: "GET",
        headers: headers,
      });

      // pre filled form
      if (task && !task.message) {
        setName(task.name || "");
        setDescription(task.description || "");

        // pre fill status
        setStatus(task.status || "todo");

        // pre fill selected project
        setProjectId(task.project?.id || "");
      }
    }

    getTask();
  }, [taskId]);

  // load projectdata for edit/create form
  useEffect(() => {
    async function getProjects() {
      // fetch all projects from API
      const response = await fetch(`${BASE_URL}/projects`, {
        method: "GET",
        headers: headers,
      });

      // convert json into js
      const data = await response.json();

      // check if API returned an array : use an emoty array to avoid map errors
      setProjects(Array.isArray(data) ? data : []);
    }

    getProjects();
  }, []);

  // run when the user submits the form
  const handleSubmit = async (event) => {
    // stop page refresh
    event.preventDefault();

    // errors message
    setError("");

    // success message
    setSuccess("");

    // validate task name
    if (name.trim() === "") {
      setError("Add task name");
      return;
    }

    // validate description
    if (description.trim() === "") {
      setError("Add task description");
      return;
    }

    // validate project selection
    if (projectId === "") {
      setError("Select project");
      return;
    }

    // choose API endpoint
    // Edit → /tasks/id
    // Create → /tasks
    const url = taskId ? `${BASE_URL}/tasks/${taskId}` : `${BASE_URL}/tasks`;

    // choose HTTP method
    // PUT = update existing task
    // POST = create new task
    const method = taskId ? "PUT" : "POST";

    // send data to API
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify({
        // send task name
        name: name,

        // send task description
        description: description,

        // send task status
        status: status,

        // send selected project id
        project_id: projectId,
      }),
    });

    // handle successful response
    if (response.ok) {
      // display success message
      setSuccess(
        taskId
          ? "Task was updated successfully!"
          : "Task was created successfully!",
      );

      // redirect back to tasks page after 1.5 seconds
      setTimeout(() => {
        router.push("/tasks");
      }, 1500);
    } else {
      // convert error response into JavaScript
      const data = await response.json();

      // display error in console for testing
      console.log("Task form error:", data);

      // show error message on page
      setError(data.message || "Task was not saved");
    }
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      {/* error message */}
      {error && <p className="notification is-danger">{error}</p>}

      {/* success message */}
      {success && <p className="notification is-success">{success}</p>}

      {/* task name field */}
      <div className="field">
        <label className="label">Enter Task Name</label>

        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Enter taskname"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
      </div>

      {/* project field */}
      <div className="field">
        <label className="label">Project</label>

        <div className="control">
          <div className="select is-fullwidth">
            <select
              value={projectId}
              onChange={(event) => setProjectId(event.target.value)}
            >
              <option value="">Select project</option>

              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* task status field */}
      <div className="field">
        <label className="label">Status</label>

        <div className="control">
          <div className="select is-fullwidth">
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="todo">todo</option>
              <option value="done">done</option>
            </select>
          </div>
        </div>
      </div>

      {/* taskdescription field */}
      <div className="field">
        <label className="label">Description</label>

        <textarea
          className="textarea"
          placeholder="Enter description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </div>

      {/* save button */}
      <button className="button is-primary" type="submit">
        {/* button text changes depending on mode */}
        {taskId ? "Update Task" : "Create Task"}
      </button>

      {/* spacing */}
      <br />
      <br />

      {/* return to tasks page */}
      <Link href="/tasks" className="button is-link ml-2">
        Go to Task Page
      </Link>
    </form>
  );
}

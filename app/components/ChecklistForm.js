// app/components/ChecklistForm.js

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

// reusable checklist form component, used for Create and Edit pages
export default function ChecklistForm({ checklistId }) {
  // router used to redirect after save
  const router = useRouter();

  // store checklist label
  const [label, setLabel] = useState("");

  // store checklist completed status
  const [completed, setCompleted] = useState(0);

  // to store task data
  const [tasks, setTasks] = useState([]);

  // to store selected task id
  const [taskId, setTaskId] = useState("");

  // store error messages
  const [error, setError] = useState("");

  // store success message
  const [success, setSuccess] = useState("");

  // load checklist data when editing
  useEffect(() => {
    async function getChecklist() {
      // stop if creating a new checklist
      if (!checklistId) {
        return;
      }

      // fetch all checklist items from API
      const response = await fetch(`${BASE_URL}/checklist-items`, {
        method: "GET",
        headers: headers,
      });

      // convert JSON response into JavaScript
      const data = await response.json();

      // make sure data is an array
      const checklists = Array.isArray(data) ? data : [];

      // find the selected checklist by id from the URL
      const checklist = checklists.find(
        (checklist) => checklist.id === checklistId,
      );

      // pre filled form
      if (checklist) {
        setLabel(checklist.label || "");
        setCompleted(checklist.completed || 0);
        setTaskId(checklist.task_id || "");
      }
    }

    getChecklist();
  }, [checklistId]);

  // load task data for create/edit form
  useEffect(() => {
    async function getTasks() {
      // fetch all tasks from API
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: "GET",
        headers: headers,
      });

      // convert JSON response into JavaScript
      const data = await response.json();

      // save tasks into state
      setTasks(Array.isArray(data) ? data : []);
    }

    getTasks();
  }, []);

  // run when the user submits the form
  const handleSubmit = async (event) => {
    // stop page refresh
    event.preventDefault();

    // errors message
    setError("");

    // success message
    setSuccess("");

    // validate checklist label
    if (label.trim() === "") {
      setError("Add checklist label");
      return;
    }

    // validate task selection
    if (taskId === "") {
      setError("Select task");
      return;
    }

    // choose API endpoint edir-create

    const url = checklistId
      ? `${BASE_URL}/checklist-items/${checklistId}`
      : `${BASE_URL}/checklist-items`;

    // choose HTTP method put/post
    const method = checklistId ? "PUT" : "POST";

    // send data to API
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify({
        // send checklist label
        label: label,

        // send completed status
        completed: Number(completed),

        // send selected task id
        task_id: taskId,
      }),
    });

    // handle successful response
    if (response.ok) {
      // display success message
      setSuccess(
        checklistId
          ? "Checklist was updated successfully!"
          : "Checklist was created successfully!",
      );

      // redirect back to checklists page after 1.5 seconds
      setTimeout(() => {
        router.push("/checklists");
      }, 1500);
    } else {
      // convert error response into JavaScript
      const data = await response.json();

      // display error in console for testing
      console.log("Checklist form error:", data);

      // show error message on page
      setError(data.message || "Checklist was not saved");
    }
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      {/* error message */}
      {error && <p className="notification is-danger">{error}</p>}

      {/* success message */}
      {success && <p className="notification is-success">{success}</p>}

      {/* checklist label field */}
      <div className="field">
        <label className="label">Enter Checklist Label</label>

        <input
          className="input"
          type="text"
          placeholder="Enter checklist label"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
        />
      </div>

      {/* task field */}
      <div className="field">
        <label className="label">Task</label>

        <div className="select is-fullwidth">
          <select
            value={taskId}
            onChange={(event) => setTaskId(event.target.value)}
          >
            <option value="">Select task</option>

            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name || task.title || task.id}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* completed field */}
      <div className="field">
        <label className="label">Completed</label>

        <div className="select is-fullwidth">
          <select
            value={completed}
            onChange={(event) => setCompleted(event.target.value)}
          >
            <option value={0}>Not completed</option>
            <option value={1}>Completed</option>
          </select>
        </div>
      </div>

      {/* save button */}
      <button className="button is-primary" type="submit">
        {/* button text changes depending on mode */}
        {checklistId ? "Update Checklist" : "Create Checklist"}
      </button>

      {/* spacing */}
      <br />
      <br />

      {/* return to checklists page */}
      <Link href="/checklists" className="button is-link ml-2">
        Go to Checklist Page
      </Link>
    </form>
  );
}

// app/checklists/page.js

"use client";

// import React hooks
import { useEffect, useState } from "react";

// import Link component for navigation
import Link from "next/link";

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

export default function ChecklistsPage() {
  // store checklist items
  const [checklists, setChecklists] = useState([]);

  // load checklist items when page opens
  useEffect(() => {
    async function getChecklists() {
      // fetch checklist items from API
      const response = await fetch(`${BASE_URL}/checklist-items`, {
        method: "GET",
        headers: headers,
      });

      // convert JSON response into JavaScript
      const data = await response.json();

      // display data in console for testing
      console.log(data);

      // save checklist items into state
      setChecklists(Array.isArray(data) ? data : []);
    }

    getChecklists();
  }, []);

  // function to delete a checklist item
  const deleteChecklist = async (id) => {
    // ask user for confirmation
    const confirmed = confirm("Do you want to delete this checklist?");

    // stop if user clicks cancel
    if (!confirmed) {
      return;
    }

    // send DELETE request
    const response = await fetch(`${BASE_URL}/checklist-items/${id}`, {
      method: "DELETE",
      headers: headers,
    });

    // remove deleted checklist item from page
    if (response.ok) {
      setChecklists(checklists.filter((checklist) => checklist.id !== id));
    } else {
      alert("Checklist was not deleted");
    }
  };

  return (
    <div className="container mt-4">
      {/* page title */}
      <h1 className="title">Checklists</h1>

      {/* create checklist button */}
      <Link href="/checklists/create" className="button is-success mb-4">
        Create Checklist
      </Link>

      {/* display checklist items */}
      {checklists.map((checklist) => (
        <div key={checklist.id} className="box">
          {/* checklist id */}
          <p>
            <strong>ID:</strong> {checklist.id}
          </p>

          {/* checklist label */}
          <p>
            <strong>Label:</strong> {checklist.label}
          </p>

          {/* checklist completion status */}
          <p>
            <strong>Completed:</strong> {checklist.completed ? "Yes" : "No"}
          </p>

          {/* task id connected to checklist */}
          <p>
            <strong>Task ID:</strong> {checklist.task_id}
          </p>

          {/* view checklist button */}
          <Link
            href={`/checklists/${checklist.id}`}
            className="button is-primary"
          >
            View
          </Link>

          {/* edit checklist button */}
          <Link
            href={`/checklists/${checklist.id}/edit`}
            className="button is-warning ml-2"
          >
            Edit
          </Link>

          {/* delete checklist button */}
          <button
            className="button is-danger ml-2"
            onClick={() => deleteChecklist(checklist.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

// milestones/page.js

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

export default function MilestonesPage() {
  const [milestones, setMilestones] = useState([]);
  // load milestones when page opens
  useEffect(() => {
    async function getMilestones() {
      const response = await fetch(`${BASE_URL}/milestones`, {
        method: "GET",
        headers: headers,
      });
      // convert json response into js
      const data = await response.json();

      setMilestones(data);
    }

    getMilestones();
  }, []);
  // function to delete a milestone
  const deleteMilestone = async (id) => {
    // to confirm
    const confirmed = confirm("Do you want to delete this milestone?");
    /// stop if user clicks cancel
    if (!confirmed) {
      return;
    }
    // send DELETE request
    const response = await fetch(`${BASE_URL}/milestones/${id}`, {
      method: "DELETE",
      headers: headers,
    });
    // remove deleted milestone from the page
    if (response.ok) {
      setMilestones(milestones.filter((milestone) => milestone.id !== id));
    } else {
      alert("Milestone was not deleted");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="title">Milestones</h1>

      <Link href="/milestones/create" className="button is-success mb-4">
        Create Milestone
      </Link>

      {milestones.map((milestone) => (
        <div key={milestone.id} className="box">
          <p>
            <strong>ID:</strong> {milestone.id}
          </p>

          <p>
            <strong>Name:</strong> {milestone.title}
          </p>
          <p>
            <strong>Project Name:</strong> {milestone.project.name}
          </p>
          <p>
            <strong>Description:</strong> {milestone.description}
          </p>
          <br></br>
          <Link
            href={`/milestones/${milestone.id}`}
            className="button is-primary"
          >
            View
          </Link>

          <Link
            href={`/milestones/${milestone.id}/edit`}
            className="button is-warning ml-2"
          >
            Edit
          </Link>

          <button
            className="button is-danger ml-2"
            onClick={() => deleteMilestone(milestone.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

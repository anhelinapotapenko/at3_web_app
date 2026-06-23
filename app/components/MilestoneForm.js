// app/components/MilestoneForm.js

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = "https://myjamjar.com.au/v1";

const headers = {
  Authorization: "Bearer 199|RogHafvvGeA4TT1m44WB5wyy57WGxYRWQ1jNSW0t8acb118b",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Integration-Name": "NMT-204782",
  "Workspaces-Identifier": "tenant-pm-009",
};

export default function MilestoneForm({ milestoneId }) {
  const router = useRouter();

  // store milestone title
  const [title, setTitle] = useState("");

  // store milestone description
  const [description, setDescription] = useState("");

  // store milestone due date
  const [dueDate, setDueDate] = useState("");

  // to store project data
  const [projects, setProjects] = useState([]);

  // to store selected project id
  const [projectId, setProjectId] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // load milestone data when editing
  useEffect(() => {
    async function getMilestone() {
      if (!milestoneId) {
        return;
      }
      // fetch one milestone from API by id
      const response = await fetch(`${BASE_URL}/milestones/${milestoneId}`, {
        method: "GET",
        headers,
      });

      const milestone = await response.json();

      if (milestone && !milestone.message) {
        setTitle(milestone.title || "");
        setDescription(milestone.description || "");
        setDueDate(milestone.due_date || "");
        setProjectId(milestone.project?.id || "");
      }
    }

    getMilestone();
  }, [milestoneId]);

  // load project data for create/edit form
  useEffect(() => {
    async function getProjects() {
      const response = await fetch(`${BASE_URL}/projects`, {
        method: "GET",
        headers,
      });

      const data = await response.json();

      setProjects(Array.isArray(data) ? data : []);
    }

    getProjects();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (title.trim() === "") {
      setError("Add milestone title");
      return;
    }

    if (description.trim() === "") {
      setError("Add milestone description");
      return;
    }

    if (dueDate.trim() === "") {
      setError("Add due date");
      return;
    }

    if (projectId === "") {
      setError("Select project");
      return;
    }

    const url = milestoneId
      ? `${BASE_URL}/milestones/${milestoneId}`
      : `${BASE_URL}/milestones`;

    const method = milestoneId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify({
        title: title,
        description: description,
        due_date: dueDate,
        project_id: projectId,
      }),
    });

    if (response.ok) {
      setSuccess(
        milestoneId
          ? "Milestone was updated successfully!"
          : "Milestone was created successfully!",
      );

      setTimeout(() => {
        router.push("/milestones");
      }, 1500);
    } else {
      const data = await response.json();
      console.log("Milestone form error:", data);
      setError(data.message || "Milestone was not saved");
    }
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      {error && <p className="notification is-danger">{error}</p>}
      {success && <p className="notification is-success">{success}</p>}

      <div className="field">
        <label className="label">Enter Milestone Title</label>

        <input
          className="input"
          type="text"
          placeholder="Enter milestone title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className="field">
        <label className="label">Project</label>

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

      <div className="field">
        <label className="label">Due Date</label>

        <input
          className="input"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </div>

      <div className="field">
        <label className="label">Description</label>

        <textarea
          className="textarea"
          placeholder="Enter description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </div>

      <button className="button is-primary" type="submit">
        {milestoneId ? "Update Milestone" : "Create Milestone"}
      </button>

      <br />
      <br />

      <Link href="/milestones" className="button is-link ml-2">
        Go to Milestone Page
      </Link>
    </form>
  );
}

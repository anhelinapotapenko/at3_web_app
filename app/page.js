// app/page.js
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

export default function HomePage() {
  // store API data
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [comments, setComments] = useState([]);

  // store loading message
  const [loading, setLoading] = useState(true);

  // helper function to make sure response is always an array
  function getList(data) {
    return Array.isArray(data) ? data : data.data || [];
  }

  // load dashboard data when page opens
  useEffect(() => {
    async function getDashboardData() {
      try {
        // fetch all API routes
        const projectsResponse = await fetch(`${BASE_URL}/projects`, {
          method: "GET",
          headers: headers,
        });

        const tasksResponse = await fetch(`${BASE_URL}/tasks`, {
          method: "GET",
          headers: headers,
        });

        const milestonesResponse = await fetch(`${BASE_URL}/milestones`, {
          method: "GET",
          headers: headers,
        });

        const checklistsResponse = await fetch(`${BASE_URL}/checklist-items`, {
          method: "GET",
          headers: headers,
        });

        const commentsResponse = await fetch(`${BASE_URL}/comments`, {
          method: "GET",
          headers: headers,
        });

        // convert JSON responses into JavaScript
        const projectsData = await projectsResponse.json();
        const tasksData = await tasksResponse.json();
        const milestonesData = await milestonesResponse.json();
        const checklistsData = await checklistsResponse.json();
        const commentsData = await commentsResponse.json();

        // save data into state
        setProjects(getList(projectsData));
        setTasks(getList(tasksData));
        setMilestones(getList(milestonesData));
        setChecklists(getList(checklistsData));
        setComments(getList(commentsData));
      } catch (error) {
        // show errors in console for testing
        console.log("Dashboard error:", error);
      } finally {
        // stop loading message
        setLoading(false);
      }
    }

    getDashboardData();
  }, []);

  // show loading message while API data is loading
  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="container mt-4">
      {/* page title */}
      <h1 className="title">Dashboard</h1>

      {/* dashboard cards */}
      <div className="columns is-multiline">
        {/* projects card */}
        <div className="column is-one-third">
          <div className="box">
            <h2 className="title is-4">Projects</h2>
            <p className="title is-2">{projects.length}</p>

            <Link href="/projects" className="button is-primary">
              View Projects
            </Link>
          </div>
        </div>

        {/* tasks card */}
        <div className="column is-one-third">
          <div className="box">
            <h2 className="title is-4">Tasks</h2>
            <p className="title is-2">{tasks.length}</p>

            <Link href="/tasks" className="button is-primary">
              View Tasks
            </Link>
          </div>
        </div>

        {/* milestones card */}
        <div className="column is-one-third">
          <div className="box">
            <h2 className="title is-4">Milestones</h2>
            <p className="title is-2">{milestones.length}</p>

            <Link href="/milestones" className="button is-primary">
              View Milestones
            </Link>
          </div>
        </div>

        {/* checklists card */}
        <div className="column is-one-third">
          <div className="box">
            <h2 className="title is-4">Checklists</h2>
            <p className="title is-2">{checklists.length}</p>

            <Link href="/checklists" className="button is-primary">
              View Checklists
            </Link>
          </div>
        </div>

        {/* comments card */}
        <div className="column is-one-third">
          <div className="box">
            <h2 className="title is-4">Comments</h2>
            <p className="title is-2">{comments.length}</p>

            <Link href="/comments" className="button is-primary">
              View Comments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

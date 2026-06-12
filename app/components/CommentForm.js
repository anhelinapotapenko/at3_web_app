// app/components/CommentForm.js
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

// reusable comment form component, used for create and edit pages
export default function CommentForm({ commentId }) {
  // router used to redirect after save
  const router = useRouter();

  // store comment content
  const [content, setContent] = useState("");

  // store project data for dropdown
  const [projects, setProjects] = useState([]);

  // store selected project id
  const [projectId, setProjectId] = useState("");

  // store error message
  const [error, setError] = useState("");

  // store success message
  const [success, setSuccess] = useState("");

  // load comment data when editing
  useEffect(() => {
    async function getComment() {
      // stop if creating new comment
      if (!commentId) {
        return;
      }

      // fetch all comments from API
      const response = await fetch(`${BASE_URL}/comments`, {
        method: "GET",
        headers: headers,
      });

      // convert json response into js
      const comments = await response.json();

      // find selected comment by id from URL
      const comment = comments.find((comment) => comment.id === commentId);

      // pre-fill form fields
      if (comment) {
        // set existing comment content
        setContent(comment.content || "");

        // set related project id from commentable object
        setProjectId(comment.commentable?.id || "");
      }
    }

    getComment();
  }, [commentId]);

  // load projects for dropdown
  useEffect(() => {
    async function getProjects() {
      // fetch all projects from API
      const response = await fetch(`${BASE_URL}/projects`, {
        method: "GET",
        headers: headers,
      });

      // convert json response into js
      const data = await response.json();

      // save projects into state
      setProjects(data);
    }

    getProjects();
  }, []);

  // run when form is submitted
  const handleSubmit = async (event) => {
    // stop page refresh
    event.preventDefault();

    // clear old messages
    setError("");
    setSuccess("");

    // validate comment content
    if (content.trim() === "") {
      setError("Add comment content");
      return;
    }

    // validate project selection
    if (projectId === "") {
      setError("Select project");
      return;
    }

    // choose API - edit or create

    const url = commentId
      ? `${BASE_URL}/comments/${commentId}`
      : `${BASE_URL}/comments`;

    // pur or post
    const method = commentId ? "PUT" : "POST";

    // send data to API
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify({
        // comment text
        content: content,

        // selected project id
        commentable_id: projectId,

        // tells API this comment belongs to a Project
        commentable_type: "Project",
      }),
    });

    // handle successful response
    if (response.ok) {
      setSuccess(
        commentId
          ? "Comment was updated successfully!"
          : "Comment was created successfully!",
      );

      // redirect back to comments page after 1.5 seconds
      setTimeout(() => {
        router.push("/comments");
      }, 1500);
    } else {
      // convert error response into js
      const data = await response.json();

      // show error in console for testing
      console.log("Comment form error:", data);

      // display error message
      setError(data.message || "Comment was not saved");
    }
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      {/* error message */}
      {error && <p className="notification is-danger">{error}</p>}

      {/* success message */}
      {success && <p className="notification is-success">{success}</p>}

      {/* project dropdown field */}
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

      {/* comment content field */}
      <div className="field">
        <label className="label">Comment Content</label>

        <textarea
          className="textarea"
          placeholder="Enter comment"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
      </div>

      {/* save button */}
      <button className="button is-primary" type="submit">
        {commentId ? "Update Comment" : "Create Comment"}
      </button>

      <br />
      <br />

      {/* return to comments page */}
      <Link href="/comments" className="button is-link ml-2">
        Go to Comment Page
      </Link>
    </form>
  );
}

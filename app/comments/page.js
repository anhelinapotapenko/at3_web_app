// comments/page.js

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

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  // load comments when page opens
  useEffect(() => {
    async function getComments() {
      const response = await fetch(`${BASE_URL}/comments`, {
        method: "GET",
        headers: headers,
      });
      // convert json response into js
      const data = await response.json();

      setComments(data);
    }

    getComments();
  }, []);
  // function to delete a comment
  const deleteComment = async (id) => {
    // to confirm
    const confirmed = confirm("Do you want to delete this comment?");
    /// stop if user clicks cancel
    if (!confirmed) {
      return;
    }
    // send DELETE request
    const response = await fetch(`${BASE_URL}/comments/${id}`, {
      method: "DELETE",
      headers: headers,
    });
    // remove deleted comment from the page
    if (response.ok) {
      setComments(comments.filter((comment) => comment.id !== id));
    } else {
      alert("Comment was not deleted");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="title">Comments</h1>

      <Link href="/comments/create" className="button is-success mb-4">
        Create Comment
      </Link>

      {comments.map((comment) => (
        <div key={comment.id} className="box">
          <p>
            <strong>ID:</strong> {comment.id}
          </p>
          <p>
            <strong>Comment For:</strong> {comment.commentable.type}
          </p>
          <p>
            <strong>Comment User Name:</strong>{" "}
            {comment.user?.name || "No user"}
          </p>

          <p>
            <strong>Verified:</strong>{" "}
            {comment.user?.email?.verified ? "Yes" : "No"}
          </p>

          <p>
            <strong>Comment User Email Verified: </strong>
            {comment.user.email.verified.toString()}
          </p>

          <p>
            <strong>Comment User Created Human:</strong>{" "}
            {comment.user?.created?.human || "No date"}
          </p>
          <br></br>
          <Link href={`/comments/${comment.id}`} className="button is-primary">
            View
          </Link>

          <Link
            href={`/comments/${comment.id}/edit`}
            className="button is-warning ml-2"
          >
            Edit
          </Link>

          <button
            className="button is-danger ml-2"
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

// comments/[id]/page.js

import Link from "next/link";

const BASE_URL = "https://myjamjar.com.au/v1";

const headers = {
  Authorization: "Bearer 199|RogHafvvGeA4TT1m44WB5wyy57WGxYRWQ1jNSW0t8acb118b",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Integration-Name": "NMT-204782",
  "Workspaces-Identifier": "tenant-pm-009",
};

export default async function CommentDetailsPage({ params }) {
  // get the comment id from the url
  const { id } = await params;
  // fetch all comments from the API
  const response = await fetch(`${BASE_URL}/comments`, {
    headers,
    cache: "no-store",
  });
  // convert json response into js
  const comments = await response.json();
  // find the comment by id in url
  const comment = comments.find((comment) => comment.id === id);
  // display error if the comment cannot be found
  if (!comment) {
    return (
      <>
        <h1 className="title">Comment not found</h1>

        <Link className="button is-light" href="/comments">
          Back
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="title">Comment Details</h1>

      <div className="box">
        <p>
          <strong>ID:</strong> {comment.id}
        </p>
        <p>
          <strong>Project Name:</strong> {comment.project?.name || "No project"}
        </p>
        <p>
          <strong>User Name:</strong> {comment.user.name}
        </p>

        <p>
          <strong>User Email:</strong>
          {comment.user.email.address}
        </p>

        <p>
          <strong>User Email Verified:</strong>
          {comment.user.email.verified || "No"}
        </p>

        <p>
          <strong>Created Human:</strong> {comment.user.created.human}
        </p>
        <p>
          <strong>Content:</strong> {comment.content}
        </p>

        <p>
          <strong>Assigned to:</strong>{" "}
          {comment.assigned_to?.name || "No assigned user"}
        </p>

        <p>
          <strong>Assigned Email:</strong>{" "}
          {comment.assigned_to?.email?.address || "No email"}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {comment.created?.human || "No created date"}
        </p>
      </div>

      <Link className="button is-warning" href={`/comments/${comment.id}/edit`}>
        Edit
      </Link>

      <Link className="button is-light ml-2" href="/comments">
        Back
      </Link>
    </>
  );
}

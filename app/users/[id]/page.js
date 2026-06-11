// users/[id]/page.js

import Link from "next/link";

const BASE_URL = process.env.API_BASE_URL;

const headers = {
  Authorization: `Bearer ${process.env.API_TOKEN}`,
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Integration-Name": "NMT-204782",
  "Workspaces-Identifier": "tenant-pm-009",
};
// user details page component
export default async function UserDetailsPage({ params }) {
  // get the user id from url
  const { id } = await params;
  // fetch all users from the API
  const response = await fetch(`${BASE_URL}/users`, {
    headers,
    // fetch fresh data insted of using cache
    cache: "no-store",
  });
  // convert JSON response into JavaScript
  const users = await response.json();
  // fint the selected user by id in url
  const user = users.find((user) => user.id === id);

  // if user cant be find - error
  if (!user) {
    return (
      <>
        <h1 className="title">User not found</h1>
        <Link className="button is-light" href="/users">
          Back
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="title">User Details</h1>

      <div className="box">
        <p>
          <strong>ID:</strong> {user.id}
        </p>

        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email?.address || "No email"}
        </p>

        <p>
          <strong>Verified:</strong> {user.email?.verified ? "Yes" : "No"}
        </p>

        <p>
          <strong>Created:</strong> {user.created?.human || "No date"}
        </p>
      </div>

      <Link className="button is-light" href="/users">
        Back
      </Link>
    </>
  );
}

// users/page.js

import Link from "next/link";

const BASE_URL = "https://myjamjar.com.au/v1";

const headers = {
  Authorization: "Bearer 199|RogHafvvGeA4TT1m44WB5wyy57WGxYRWQ1jNSW0t8acb118b",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Integration-Name": "NMT-204782",
  "Workspaces-Identifier": "tenant-pm-009",
};

export default async function UsersPage() {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const users = await response.json();
  return (
    <div className="container mt-4 ">
      <h1 className="display-5 fw-bold text-primary text-center mb-4">Users</h1>
      {users.map((user) => (
        <div key={user.id} className="box">
          <h3>{user.name}</h3>

          <p>
            <strong>ID:</strong> {user.id}
          </p>

          <p>
            <strong>Email:</strong> {user.email.address}
          </p>

          <Link href={`/users/${user.id}`} className="btn btn-primary">
            View
          </Link>
        </div>
      ))}
    </div>
  );
}

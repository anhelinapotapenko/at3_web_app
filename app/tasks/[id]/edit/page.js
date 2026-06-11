// projects/[id]/edit/page.js

import ProjectForm from "../../../components/ProjectForm";

export default async function EditProjectPage({ params }) {
  const { id } = await params;

  return (
    <>
      <h1 className="title">Edit Project</h1>

      <ProjectForm projectId={id} />
    </>
  );
}

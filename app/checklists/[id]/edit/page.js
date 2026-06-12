// app/checklists/[id]/edit/page.js

import ChecklistForm from "../../../components/ChecklistForm";

export default async function EditChecklistPage({ params }) {
  const { id } = await params;

  return (
    <>
      <h1 className="title">Edit Checklist</h1>

      <ChecklistForm checklistId={id} />
    </>
  );
}

// milestones/[id]/edit/page.js

import MilestoneForm from "../../../components/MilestoneForm";

export default async function EditMilestonePage({ params }) {
  const { id } = await params;

  return (
    <>
      <h1 className="title">Edit Milestone</h1>

      <MilestoneForm milestoneId={id} />
    </>
  );
}

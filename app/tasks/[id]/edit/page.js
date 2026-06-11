// tasks/[id]/edit/page.js

import TaskForm from "../../../components/TaskForm";

export default async function EditTaskPage({ params }) {
  const { id } = await params;

  return (
    <>
      <h1 className="title">Edit Task</h1>

      <TaskForm taskId={id} />
    </>
  );
}

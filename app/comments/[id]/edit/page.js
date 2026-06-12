// comments/[id]/edit/page.js

import CommentForm from "../../../components/CommentForm";

export default async function EditCommentPage({ params }) {
  const { id } = await params;

  return (
    <>
      <h1 className="title">Edit Comment</h1>

      <CommentForm commentId={id} />
    </>
  );
}

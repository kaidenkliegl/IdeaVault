import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../../redux/notes/notesThunks"; // assuming your thunk is here
import { useParams, useNavigate } from "react-router-dom";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {notebookId} = useParams();
  const nbkId = Number(notebookId)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = await dispatch(createNote({ title, content }, nbkId));
    if (newNote?.id) {
      navigate(`/notes/${newNote.id}`);
    }
  };

  return (
    <form className="note-form-container" onSubmit={handleSubmit}>
      <h2>Create Note</h2>

      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button type="submit">Create Note</button>
    </form>
  );
}

export default NoteForm;

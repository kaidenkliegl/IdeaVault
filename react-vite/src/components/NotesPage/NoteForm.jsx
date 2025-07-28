import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../../redux/notes/notesThunks";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./NoteForm.css"; 



const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: 1 }, { header: 2 }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { notebookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = await dispatch(createNote({ title, content }, Number(notebookId)));
    if (newNote?.id) {
      navigate(`/notes/${newNote.id}`);
    }
  };

  return (
    <form className="note-form-container" onSubmit={handleSubmit}>
      <h2 className="new-note-header">New Note</h2>

      <label htmlFor="note-title">Title</label>
      <input
        id="note-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="note-content">Content</label>
      <ReactQuill
        id="note-content"
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Start your note...optional"
        modules={modules}
        style={{ minHeight: "300px", marginBottom: "20px" }}
      />

      <button type="submit" className="create-note-button">Create Note</button>
    </form>
  );
}

export default NoteForm;

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  retrieveNote,
  deleteNote,
  updateNote,
} from "../../redux/notes/notesThunks";
import NotesList from "./NotesList";
import "./NoteDetail.css";

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

function NoteDetail() {
  const { noteId } = useParams();
  const note_id = Number(noteId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const note = useSelector((state) => state.notes.byId[note_id]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!note) {
      dispatch(retrieveNote(note_id));
    } else if (!hasInitialized.current) {
      setTitle(note.title);
      setContent(note.content);
      hasInitialized.current = true;
    }
  }, [dispatch, note_id, note]);

  useEffect(() => {
    if (!note) return;

    const timer = setTimeout(() => {
      if (title !== note.title || content !== note.content) {
        dispatch(updateNote({ id: note_id, title, content }));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, content, dispatch, note, note_id]);

  const handleDelete = async () => {
    await dispatch(deleteNote(note_id));
    navigate(`/notebook/${note.notebook_id}/notes`);
  };

  if (!note) return <div className="loading-message">Loading...</div>;

  return (
    <div className="notes-parent-container">
      <div className="notes-sidebar">
        <NotesList notebookId={note.notebook_id} />
      </div>

      <div className="note-detail-container">
        <div className="title-section">
          {isEditingTitle ? (
            <input
              className="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              autoFocus
            />
          ) : (
            <>
              <h3 className="note-title">{title}</h3>
              <button
                className="edit-title-button"
                onClick={() => setIsEditingTitle(true)}
              >
                Edit Title
              </button>
              <button className="delete-note-button" onClick={handleDelete}>
                Delete Note
              </button>
            </>
          )}
        </div>

        <ReactQuill
          className="quill-editor"
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Write your note..."
          modules={modules}
          style={{ minHeight: "300px", marginBottom: "20px" }}
        />
      </div>
    </div>
  );
}

export default NoteDetail;

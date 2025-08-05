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
import { getTagsThunk } from "../../redux/tags/tagsThunk";
import { tagNoteThunk, untagNoteThunk } from "../../redux/notes/notesThunks";
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
  const allTags = useSelector((state) => state.tags.allIds.map((id) => state.tags.byId[id]));
  const noteTags = note ? note.tags : [];
  const noteTagIds = new Set(noteTags.map((tag) => tag.id));
  // local state for note title and content
  // and whether the title is being edited

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const hasInitialized = useRef(false);

  // load note data when component mounts or note_id changes
  useEffect(() => {
    if (!note) {
      dispatch(retrieveNote(note_id));
    } else if (!hasInitialized.current) {
      setTitle(note.title);
      setContent(note.content);
      hasInitialized.current = true;
    }
  }, [dispatch, note_id, note]);

  // auto save note changes after 1 second of inactivity
  useEffect(() => {
    if (!note) return;

    const timer = setTimeout(() => {
      if (title !== note.title || content !== note.content) {
        dispatch(updateNote({ id: note_id, title, content }));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, content, dispatch, note, note_id]);

  // load tags when component mounts
  useEffect(() => {
    dispatch(getTagsThunk());
  }, [dispatch]);

  // delete note handler
  const handleDelete = async () => {
    await dispatch(deleteNote(note_id));
    navigate(`/notebook/${note.notebook_id}/notes`);
  };

  //tag/untag note handler
  const handleTagToggle = (tagId) => {
    if (noteTagIds.has(tagId)) {
      dispatch(untagNoteThunk(note_id, tagId));
    } else {
      dispatch(tagNoteThunk(note_id, tagId));
    }
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

        {/* Tag Selector */}
        <div className="note-tags-section">
          <h4>Tags:</h4>
          <ul className="note-tags-list">
            {allTags.map((tag) => (
              <li key={tag.id} className="note-tag-checkbox-item">
                <label className="tag-checkbox-label">
                  <input
                    type="checkbox"
                    checked={noteTagIds.has(tag.id)}
                    onChange={() => handleTagToggle(tag.id)}
                  />
                  {tag.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


//   return (
//     <div className="notes-parent-container">
//       <div className="notes-sidebar">
//         <NotesList notebookId={note.notebook_id} />
//       </div>

//       <div className="note-detail-container">
//         <div className="title-section">
//           {isEditingTitle ? (
//             <input
//               className="title-input"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               onBlur={() => setIsEditingTitle(false)}
//               autoFocus
//             />
//           ) : (
//             <>
//               <h3 className="note-title">{title}</h3>
//               <button
//                 className="edit-title-button"
//                 onClick={() => setIsEditingTitle(true)}
//               >
//                 Edit Title
//               </button>
//               <button className="delete-note-button" onClick={handleDelete}>
//                 Delete Note
//               </button>
//             </>
//           )}
//         </div>

//         <ReactQuill
//           className="quill-editor"
//           theme="snow"
//           value={content}
//           onChange={setContent}
//           placeholder="Write your note..."
//           modules={modules}
//           style={{ minHeight: "300px", marginBottom: "20px" }}
//         />
//       </div>
//     </div>
//   );
// }

export default NoteDetail;

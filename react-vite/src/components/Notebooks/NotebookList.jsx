// react-vite/src/components/Notebooks/NotebookList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkFetchNotebooks,
  thunkDeleteNotebook,
} from "../../redux/notebooks";
import { retrieveNotes } from "../../redux/notes/notesThunks";
import NotebookItem from "../NotebookItem/NotebookItem";
import "./NotebookList.css";

function NotebookList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get notebooks as an array
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  //get notebooks from store
  const notesById = useSelector((state) => state.notes.byId);
  const allIds = useSelector((state) => state.notes.allIds);

  const notesFromNotebook = (notebookId) =>
    allIds
      .map((id) => notesById[id])
      .filter((note) => note.notebook_id === notebookId);

  const [scrolledId, setScrolledId] = useState(null);

  // Fetch notebooks on mount
  useEffect(() => {
    dispatch(thunkFetchNotebooks());
  }, [dispatch]);

  // Delete notebook
  const handleDelete = async (id) => {
    await dispatch(thunkDeleteNotebook(id));
  };

  const handleScroll = (notebookId) => {
    if (scrolledId === notebookId) {
      setScrolledId(null);
    } else {
      setScrolledId(notebookId);
      dispatch(retrieveNotes(notebookId));
    }
  };
  return (
    <div className="notebook-page-div">
      <div className="notebook-list-header">
        <h2>Your Notebooks</h2>
      </div>

      <button
        onClick={() => navigate("/notebooks/new")}
        className="notebook-create-button"
      >
        New Notebook
      </button>

      <ul className="notebook-list-container">
        {notebooks.map((notebook) => (
          <li key={notebook.id} className="notebook-note">
            <NotebookItem
              notebook={notebook}
              onView={() => handleScroll(notebook.id)}
              onEdit={() => navigate(`/notebooks/${notebook.id}/edit`)}
              onDelete={handleDelete}
            />
            {scrolledId === notebook.id &&
              (notesFromNotebook(notebook.id).length > 0 ? (
                <ul className="note-sublist">
                  {notesFromNotebook(notebook.id).map((note) => (
                    <li key={note.id}>{note.title}</li>
                  ))}
                </ul>
              ) : (
                <button
                  className="create-note-button"
                  onClick={() => navigate(`/notebook/${notebook.id}/notes/new`)}
                >
                  Create Your First Note
                </button>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotebookList;

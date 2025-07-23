import { setNote, setNotes, createNote, deleteNote} from "./notesAction";






// Get all notes for a notebook
export const retrieveNotes = (notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/notebook/${notebookId}/notes`);
    const data = await response.json();
    dispatch(setNotes(data));
  };
  
  // Get a single note
  export const retrieveNote = (noteId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/${noteId}`);
    const data = await response.json();
    dispatch(setNote(data));
  };
  
  // Create a new note for a notebook
  export const createNote = (noteInfo, notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/notebook/${notebookId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteInfo),
    });
    const data = await response.json();
    dispatch(createNote(data));
  };
  
  // Delete a note
  export const deleteNote = (noteId) => async (dispatch) => {
    await csrfFetch(`/api/notes/${noteId}`, {
      method: "DELETE",
    });
    dispatch(deleteNote(noteId));
  };
  
import { setNote, setNotes, newNote, removeNote, editNote} from "./notesAction";







// Get all notes for a notebook
export const retrieveNotes = (notebookId) => async (dispatch) => {
    const response = await fetch(`/api/notes/notebook/${notebookId}/notes`);
    const data = await response.json();
    dispatch(setNotes(data.notes));
  };
  
  // Get a single note
  export const retrieveNote = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}`);
    const data = await response.json();
    dispatch(setNote(data.note));
  };
  
  // Create a new note for a notebook
  export const createNote = (noteInfo, notebookId) => async (dispatch) => {
    const response = await fetch(`/api/notes/notebook/${notebookId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteInfo),
    });
    const data = await response.json();
    dispatch(newNote(data.note));
    return data.note
  };
  
  // Delete a note
  export const deleteNote = (noteId) => async (dispatch) => {
    await fetch(`/api/notes/${noteId}`, {
      method: "DELETE",
    });
    dispatch(removeNote(noteId));
  };

//   edit a note 
export const updateNote = (note) => async (dispatch) => {
    const response = await fetch(`/api/notes/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
      }),
    });
  
    if (response.ok) {
      const updatedNote = await response.json();
      dispatch(editNote(updatedNote));  
      return updatedNote;               
    } else {
      throw new Error("Failed to update note");
    }
  };
  
  
import { setNote, setNotes, newNote, removeNote, editNote } from "./notesAction";





// get all notes 
export const thunkFetchAllNotes = () => async (dispatch) => {
  const res = await fetch('/api/notes/all', {
    credentials: "include"
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(setNotes(data.notes));
    return data.notes;
  } else {
    const errorData = await res.json();
    return errorData;
  }
};

// Get all notes for a notebook
export const retrieveNotes = (notebookId) => async (dispatch) => {
  const response = await fetch(`/api/notes/notebook/${notebookId}/notes`, {
    credentials: "include"
  });
  const data = await response.json();
  dispatch(setNotes(data.notes));
};

// Get a single note
export const retrieveNote = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    credentials: "include"
  });
  const data = await response.json();
  dispatch(setNote(data.note));
};

// Create a new note for a notebook
export const createNote = (noteInfo, notebookId) => async (dispatch) => {
  const response = await fetch(`/api/notes/notebook/${notebookId}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteInfo),
    credentials: "include" // Make sure cookies are sent!
  });
  const data = await response.json();
  dispatch(newNote(data.note));
  return data.note
};

// Delete a note
export const deleteNote = (noteId) => async (dispatch) => {
  await fetch(`/api/notes/${noteId}`, {
    method: "DELETE",
    credentials: "include" // Make sure cookies are sent!
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
    credentials: "include" // Make sure cookies are sent!
  });

  if (response.ok) {
    const updatedNote = await response.json();
    dispatch(editNote(updatedNote));
    return updatedNote;
  } else {
    throw new Error("Failed to update note");
  }
};



//action type constants
export const SET_NOTES = "notes/setNotes";       
export const SET_NOTE = "notes/setNote";         
export const CREATE_NOTE = "notes/createNote";   
export const DELETE_NOTE = "notes/deleteNote"; 
export const EDIT_NOTE = "notes/editNote"

// action creators 

export const setNotes = (notes) => {
    return {
        type: SET_NOTES,
        payload: notes
    };
}

export const setNote = (note) => {
    return {
        type: SET_NOTE, 
        payload: note
    };
}

export const newNote = (note) => {
    return {
        type: CREATE_NOTE,
        payload: note
    };
}

export const removeNote = (noteId) => {
    return {
        type: DELETE_NOTE,
        payload: noteId
    };
}

export const editNote = (note) => {
    return {
        type: EDIT_NOTE,
        payload: note
    };
}



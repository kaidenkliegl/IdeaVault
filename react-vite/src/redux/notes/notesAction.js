


//action type constants
const SET_NOTES = "notes/setNotes";       
const SET_NOTE = "notes/setNote";         
const CREATE_NOTE = "notes/createNote";   
const DELETE_NOTE = "notes/deleteNote"; 

// action creators 

const setNotes = (notes) => {
    return {
        type: SET_NOTES,
        payload: notes
    };
}

const setNote = (note) => {
    return {
        type: SET_NOTE, 
        payload: note
    };
}

const createNote = (note) => {
    return {
        type: CREATE_NOTE,
        payload: note
    };
}

const deleteNote = (noteId) => {
    return {
        type: DELETE_NOTE,
        payload: noteId
    };
}




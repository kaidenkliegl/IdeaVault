import { SET_NOTE, SET_NOTES, CREATE_NOTE, DELETE_NOTE } from "./notesAction";

const initialState = {
  byId: {},
  allIds: [],
};

const NotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTES: {
      const notesById = {};
      const notesIds = [];
      action.payload.forEach((note) => {
        notesById[note.id] = note;
        notesIds.push(note.id);
      });
      return {
        ...state,
        byId: notesById,
        allIds: notesIds,
      };
    }

    case SET_NOTE: {
      const note = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [note.id]: note,
        },
        allIds: state.allIds.includes(note.id)
          ? state.allIds
          : [...state.allIds, note.id],
      };
    }

    case CREATE_NOTE: {
      const note = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [note.id]: note,
        },
        allIds: [...state.allIds, note.id],
      };
    }

    case DELETE_NOTE: {
   
      const noteId = action.payload;

      const remainingNotes = { ...state.byId };
      delete remainingNotes[noteId];
      const filteredIds = state.allIds.filter((id) => id !== noteId);

      return {
        ...state,
        byId: remainingNotes,
        allIds: filteredIds,
      };
    }
    default:
        return state
  }
};

export default NotesReducer;

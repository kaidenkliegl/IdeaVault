const initialState = {
  session: {
    user: null,
  },
  notebooks: {
    byId: {},
    allIds: [],
  },
  notes: {
    byId: {},
    allIds: [],
  },
  selectedNote: null,

  tasks: {
    byId: {},
    allIds: [],
  },
};

const NotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTES:
      const notesById = {};
      const notesIds = [];
      action.payload.forEach((note) => {
        notesById[note.id] = note;
        notesIds.push(note.id);
      });
      return {
        ...state,
        notes: {
          byId: notesById,
          allIds: notesIds,
        },
      };

    case SET_NOTE: {
      const note = action.payload;

      return {
        ...state,
        notes: {
          byId: {
            ...state.notes.byId,
            [note.id]: note,
          },
          allIds: state.notes.allIds.includes(note.id)
            ? state.notes.allIds
            : [...state.notes.allIds, note.id],
        },
      };
    }

    case CREATE_NOTE: {
      const note = action.payload;

      return {
        ...state,
        notes: {
          byId: {
            ...state.notes.byId,
            [note.id]: note,
          },
          allIds: [...state.notes.allIds, note.id],
        },
      };
    }

    case DELETE_NOTE:
      const note = action.payload;
      const noteId = note.id;

      const remainingNotes = { ...state.notes.byId };
      delete remainingNotes[noteId];
      const filteredIds = state.notes.allIds.filter((id) => {
        return id !== noteId;
      });

      return {
        ...state,
        notes: {
          byId: remainingNotes,
          allIds: filteredIds,
        },
      };
  }
};

export default NotesReducer;

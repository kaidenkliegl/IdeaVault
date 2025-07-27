// react-vite/src/redux/notebooks.js

// These const are so we can use them in our actions and reducers
// They are used to identify the type of action being dispatched
const SET_NOTEBOOKS = 'notebooks/setNotebooks';
const ADD_NOTEBOOK = 'notebooks/addNotebook';
const UPDATE_NOTEBOOK = 'notebooks/updateNotebook';
const DELETE_NOTEBOOK = 'notebooks/deleteNotebook';

// These are the action creators for our notebooks
const setNotebooks = (notebooks) => ({
    type: SET_NOTEBOOKS, // This action will set the notebooks in the state
    payload: notebooks // tHIS payload is for the data we want to set in the state
    });

const addNotebook = (notebook) => ({
    type: ADD_NOTEBOOK,
    payload: notebook 
});

const updateNotebook = (notebook) => ({
    type: UPDATE_NOTEBOOK,
    payload: notebook
});

const deleteNotebook = (notebookId) => ({
    type: DELETE_NOTEBOOK,
    payload: notebookId
});

// These are the thunk actions for our notebooks

// This thunk will fetche all notebooks from the server
export const thunkFetchNotebooks = () => async (dispatch) => {
    // This is the endpoint to get all notebooks
    const res = await fetch('/api/notebooks/'); 
    // If the response is ok, it will get the data
    if (res.ok) { 
        // it will get the data in JSON format
        const data = await res.json();
        // Dispatches the action to set the notebooks in the state
        dispatch(setNotebooks(data)); 
    }

};

// This thunk will fetch a single notebook by its ID
export const thunkCreateNotebook = (notebookdata) => async (dispatch) => {
    const res = await fetch('/api/notebooks/', {
        // This is the method to create a new notebook
        method: 'POST', 
        // This is the header to tell the server we are sending JSON data
        headers: { 'Content-Type': 'application/json' }, 
        // This is the body of the request, which contains the notebook data
        body: JSON.stringify(notebookdata) 
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addNotebook(data));
        // So it returns the created notebook data
        return data; 
        // If the response is not ok, it will get the error messages
    } else if (res.status < 500) { 
        const data = await res.json();
        return data;
         // If the response is a server error, it will return this error message
    } else {
        return { server: 'Something went wrong. Please try again' };
    }
};

// This thunk will update a notebook by its ID
export const thunkUpdateNotebook = (notebookId, notebookdata) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${notebookId}`, {
        // This is the method to update a notebook
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notebookdata)
    });

    if (res.ok) { 
        const data = await res.json();
        dispatch(updateNotebook(data));
        return data;
    } else if (res.status < 500) {
        const data = await res.json();
        return data;
    } else {
        return { server: 'Something went wrong. Please try again' };
    }
};

// This thunk will delete a notebook by its ID
export const thunkDeleteNotebook = (notebookId) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${notebookId}`, {
        // This is the method to delete a notebook
        method: 'DELETE' 
    });

    // If the response is ok, it will to delete the notebook
    if (res.ok) { 
        dispatch(deleteNotebook(notebookId));
    } else if (res.status < 500) {
        const data = await res.json();
        return data;
    } else {
        return { server: 'Something went wrong. Please try again' };
    }
};

// This is the initial state of our notebooks reducer
// It is an empty object because we will populate it with the notebooks data
const initialState = {};

// This is the reducer for our notebooks
function notebooksReducer(state = initialState, action) {
    // This switch statement will handle the actions dispatched
    switch (action.type) { 
        // This case will handle the action to set the notebooks in the state
        case SET_NOTEBOOKS: { 
            // Create a new object to hold the notebooks
            const newState = {}; 
            // Iterate over the notebooks in the payload
            action.payload.forEach(notebook => 
                newState[notebook.id] = notebook
            );
            // Return the new state with the notebooks
            return newState; 

    }

    // This case will handle the action to add a new notebook
    case ADD_NOTEBOOK: 
    // This case will handle the action to update an existing notebook
    case UPDATE_NOTEBOOK: 
        // Returns a new state with the notebook added or updated
        return { 
            ...state,
            [action.payload.id]: action.payload
        };

    // This case will handle the action to delete a notebook
    case DELETE_NOTEBOOK: { 
        // Creates a new object to hold the state
        const newState = { ...state }; // Create a new object to hold the state
        // Deletes the notebook with the ID from the payload
        delete newState[action.payload]; 
        // Returns the new state without the deleted notebook
        return newState; 

    }

    // If the action type does not match any case, it will return the current state
    default: 
        return state;
    }
}

// the export for the notebooksReducer
export default notebooksReducer;
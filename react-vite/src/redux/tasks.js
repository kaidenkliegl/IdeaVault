// react-vote/src/components/redux/tasks.js

// these are the action types
const SET_TASKS = 'tasks/setTasks';
const ADD_TASK = 'tasks/addTask';
const UPDATE_TASK = 'tasks/updateTask';
const DELETE_TASK = 'tasks/deleteTask';

// These ar going to be the action creators
const setTasks = (tasks) => ({
    type: SET_TASKS,
    payload: tasks
})

const addTask = (task) => ({
    type: ADD_TASK,
    payload: task
})

const updateTask = (task) => ({
    type: UPDATE_TASK,
    payload: task
})

const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    payload: taskId
})

// These are going to be the thunbks for tasks
export const thunkFetchTasks = () => async (dispatch) => {
    const res = await fetch('/api/tasks/', {
        credentials: "include"
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(setTasks(data.tasks));

    }
};

export const thunkCreateTask = (noteId, taskData) => async (dispatch) => {
    const res = await fetch(`/api/tasks/notes/${noteId}/tasks`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
            credentials: 'include' // Make sure cookies are sent!   
        });

    if (res.ok) {
        const data = await res.json();
        dispatch(addTask(data.task));
        return data;

    } else if (res.status < 500) {
        const data = await res.json();
        return data;
    } else {
        return { server: 'Something went wrong. Please try again' };

    }
};

export const thunkUpdateTask = (taskId, taskData) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${taskId}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });

    if (res.ok) {
        const data = await res.json();
        dispatch(updateTask(data.task));
        return data;

    } else if (res.status < 500) {
        const data = await res.json();
        return data;
    } else {
        return { server: 'Something went wrong. Please try again' };

    }
};

export const thunkDeleteTask = (taskId) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include' // Make sure cookies are sent!
    });

    if (res.ok) {

        dispatch(deleteTask(taskId));


    } else if (res.status < 500) {
        const data = await res.json();
        return data;
    } else {
        return { server: 'Something went wrong. Please try again' };

    }
};

// This is going to be the reducer fior tasks
const initialState = {};

function tasksReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TASKS: {
            const newState = {};
            action.payload.forEach(task => {
                newState[task.id] = task;
            })
            return newState

        }

        case ADD_TASK:
        case UPDATE_TASK:
            return {
                ...state,
                [action.payload.id]: action.payload
            };

        case DELETE_TASK: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }

        default:
            return state
    }

}

export default tasksReducer

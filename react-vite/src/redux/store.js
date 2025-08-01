import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import NotesReducer from "./notes/notesReducer";
import notebooksReducer from "./notebooks";
import tasksReducer from "./tasks";
import tagsReducer from "./tags/tagsReducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  notes: NotesReducer,
  notebooks: notebooksReducer,
  tasks: tasksReducer,
  tags: tagsReducer
})



let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import NotebookDetails from '../components/Notebooks/NotebookDetails';
import NotebookForm from '../components/Notebooks/NotebookForm';
import NotebookList from '../components/Notebooks/NotebookList';
import NotesList from '../components/NotesPage/NotesList';
import NoteDetail from '../components/NotesPage/NoteDetail';
import NoteForm from '../components/NotesPage/NoteForm';
import TaskList from '../components/Tasks/TaskList';
import TaskForm from '../components/Tasks/TaskForm';
import AboutPage from '../components/AboutPage/About';
import AllNotesList from '../components/NotesPage/UserNotes';

import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <h1>Welcome To IdeaVault!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "notebooks",
        element: <NotebookList/>
      },
      {
        path: "notebooks/new",
        element: <NotebookForm/>
      },
      {
        path: "notebooks/:notebookId/edit",
        element: <NotebookForm/>
      },
      {
        path: "notebooks/:notebookId",
        element: <NotebookDetails/>
      },
      {
        path: "notebook/:notebookId/notes",
        element: <NotesList />,
      },
      {
        path: "notes/:noteId",
        element: <NoteDetail />,
      }, 
      {
        path: "notebook/:notebookId/notes/new",
        element: <NoteForm />,
      },
      {
        path: "tasks",
        element: <TaskList />
      },
      {
        path: "tasks/new",
        element: <TaskForm />
      },
      {
        path: "tasks/:taskId/edit",
        element: <TaskForm />
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "notes/all",
        element: <AllNotesList />
      }
    ],
  },
]);
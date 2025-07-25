import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import NotebookDetails from '../components/Notebooks/NotebookDetails';
import NotebookForm from '../components/Notebooks/NotebookForm';
import NotebookList from '../components/Notebooks/NotebookList';

import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
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
      }
    ],
  },
]);
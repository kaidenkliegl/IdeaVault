import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import CreateTagForm from '../components/Tags/CreateTagForm';
import EditTagForm from '../components/Tags/EditTagForm';
import TagList from '../components/Tags/TagList';

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
        path: "tags",
        element: <TagList />  // List all tags,
      },
      {
        path: "tags/new",
        element: <CreateTagForm />, // Form to create a new tag
      },
      {
        path: "tags/:tagId/edit",
        element: <EditTagForm />, // Form to edit an existing tag
      },
    ],
  },
]);
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import ErrorPage from './ErrorPage';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';
import PersonalDetails from './PersonalDetails';
import Contacts from './Contacts';
import SkillCategories from './SkillCategories';
import Skills from './Skills';
import Sections from './Sections';
import SectionItems from './SectionItems';

const theme = createTheme({
  palette: { mode: 'dark' },
  typography: {
    h1: {
      fontSize: '4em',
    },
    h2: {
      fontSize: '3.5em',
    },
    h3: {
      fontSize: '3em',
    },
    h4: {
      fontSize: '2.5em',
    },
    h5: {
      fontSize: '2em',
    },
    h6: {
      fontSize: '1.5em',
    },
    body1: { fontSize: '1em' },
    body2: { fontSize: '1em' },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/personal-details',
    element: <PersonalDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/contacts',
    element: <Contacts />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/skills',
    element: <SkillCategories />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/skills/:category',
        element: <Skills />,
      },
    ],
  },
  {
    path: '/sections',
    element: <Sections />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/sections/:section',
        element: <SectionItems />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
);

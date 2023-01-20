import React from 'react';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import Main from './pages/Main/Main';
import Article from './pages/Article/Article';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>
  },
  {
    path: '/article/:id',
    element:<Article />
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

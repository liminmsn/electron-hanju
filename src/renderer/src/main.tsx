import './assets/main.css'

import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)

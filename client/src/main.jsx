import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx';
import Onboarding from './pages/Onboarding.jsx';
import UserDashboard from './pages/UserDashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <LoginPage/>
      },
      {
        path: "onboarding",
        element: <Onboarding/>
      },
      {
        path: "user-dashboard",
        element: <UserDashboard/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
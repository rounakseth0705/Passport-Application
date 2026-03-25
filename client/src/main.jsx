import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx';
import Onboarding from './pages/Onboarding.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import ProtectRoute from './components/ProtectRoute.jsx';

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
        element: <ProtectRoute>
          <Onboarding/>
        </ProtectRoute>
      },
      {
        path: "user-dashboard",
        element: <ProtectRoute>
          <UserDashboard/>
        </ProtectRoute>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
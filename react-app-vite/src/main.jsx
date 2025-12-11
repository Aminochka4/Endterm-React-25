import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from "./pages/NotFoundPage.jsx";
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Profile from  './pages/Profile.jsx'
import CharacterList from './components/CharacterList.jsx';
import CharacterDetails from './pages/CharacterDetails.jsx';
import Favorites from "./pages/Favorites.jsx";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { Provider } from "react-redux";
import { store } from "./store/store";


const router = createBrowserRouter([
  { 
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/characters", element: <CharacterList /> },
      { path: "/characters/:id", element: <CharacterDetails /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "/signup", element: <Signup />},
      { path: "/profile", element: <Profile />},
      { path: "/favorites", element: <Favorites /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        console.log('Service Worker registered:', reg);
      })
      .catch(err => {
        console.error('Service Worker registration failed:', err);
      });
  });
}
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Contact from './pages/Contact.jsx';
import PageDev from './pages/PageDev.jsx';
import Community from './pages/Community.jsx';
import Profile from './pages/ProfilePage.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from '../components_api/ProtectedRoute.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/comunidade" element={<Community />} />
        <Route path="/register" element={<Register />} />

        {/* Protegidas */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="user">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dev"
          element={
            <ProtectedRoute role="admin">
              <PageDev />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Contact from './pages/Contact.jsx';
import PageDev from './pages/PageDev.jsx';
import Community from './pages/Community.jsx';
import Profile from './pages/ProfilePage.jsx';
import ProtectedRoute from "./ProtectedRoute.jsx"; // atenção ao nome

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dev" element={<PageDev />} />
        <Route path="/Comunidade" element={<Community />} />

        {/* Rota protegida */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

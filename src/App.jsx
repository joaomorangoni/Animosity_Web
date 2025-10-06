import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Contact from './pages/Contact.jsx';
import PageDev from './pages/PageDev.jsx';
import Community from './pages/Community.jsx';
import Profile from './pages/ProfilePage.jsx';
import Register from './pages/Register.jsx';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dev" element={<PageDev />} />
        <Route path="/comunidade" element={<Community />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

      
      </Routes>
    </Router>
  );
}

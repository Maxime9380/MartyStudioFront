import Navbar from './components/Navbar'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import { MariagePage } from './pages/MariagePage';
import { SeancePage } from './pages/SeancePage';
import { GaleriePublic } from './pages/GaleriePublicPage';
import { GaleriePrive } from './pages/GaleriePrivePage';
import PasswordOublie from './pages/PasswordOublie';
import PasswordReset from './pages/PasswordReset';
import PhotoboothPage from './pages/PhotoboothPage';
import AdminPage from './pages/AdminPage';
import CommentairePage from './pages/CommentairePage';


function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        {/* Definez vos routes ici */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/apropos" element={<HomePage/>} />
        <Route path="/mariages" element={<MariagePage/>} />
        <Route path="/seances" element={<SeancePage/>} />
        <Route path="/galeries" element={<GaleriePublic/>} />
        <Route path="/photobooth" element={<PhotoboothPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/temoignages" element={<CommentairePage/>} />
        <Route path="/connexion" element={<LoginPage/>} />
        <Route path="/galeriePrivee" element={<GaleriePrive/>} />
        <Route path="/passwordOublie" element={<PasswordOublie/>}/>
        <Route path="/passwordReset/:resetToken" element={<PasswordReset/>}/>
        <Route path="/adminpage" element={<AdminPage/>}/>
      </Routes>
      
      <Footer />
    </Router>
  );
}
export default App

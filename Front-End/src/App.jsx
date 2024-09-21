import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from './components/NavBar/Navbar';
import Pengajuan from './components/pengajuan/Pengajuan';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Beflog from './components/BefLog/Beflog';
import Perbaikan from './components/pengajuan/perbaikan/Perbaikan';
import Penggantian from './components/pengajuan/penggantian/Penggantian';
import Footer from './components/footer/Footer';
import Masalah from './components/masalah/Masalah';
import Hasil from './components/hasil/Hasil';
import AHome from './components/AdminPage/AHome/AHome';
import ANavbar from './components/AdminPage/ANavbar/ANavbar';
import AFinalisasi from './components/AdminPage/AFinalisasi/AFinalisasi';
import APengajuan from './components/AdminPage/APengajuan/APengajuan';
import AVerifikasi from './components/AdminPage/AVerifikasi/AVerifikasi';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  return (
    <Router>
      <NavBarWrapper role={role} />
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated 
                ? role === 'admin' 
                  ? <Navigate to="/AHome" />
                  : <Home /> 
                : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/login" 
            element={
              <Login 
                onLogin={(userRole) => {
                  setIsAuthenticated(true);
                  setRole(userRole);
                }} 
              />
            } 
          />
          
          {/* User Routes */}
          <Route path="/pengajuan" element={isAuthenticated && role === 'user' ? <Pengajuan /> : <Navigate to="/login" />} />
          <Route path="/before" element={isAuthenticated && role === 'user' ? <Beflog /> : <Navigate to="/login" />} />
          <Route path="/perbaikan" element={isAuthenticated && role === 'user' ? <Perbaikan /> : <Navigate to="/login" />} />
          <Route path="/penggantian" element={isAuthenticated && role === 'user' ? <Penggantian /> : <Navigate to="/login" />} />
          <Route path="/masalah" element={isAuthenticated && role === 'user' ? <Masalah /> : <Navigate to="/login" />} />
          <Route path="/hasil" element={isAuthenticated && role === 'user' ? <Hasil /> : <Navigate to="/login" />} />
          
          {/* Admin Routes */}
          <Route path="/AHome" element={isAuthenticated && role === 'admin' ? <AHome /> : <Navigate to="/login" />} />
          <Route path="/AFinalisasi" element={isAuthenticated && role === 'admin' ? <AFinalisasi /> : <Navigate to="/login" />} />
          <Route path="/APengajuan" element={isAuthenticated && role === 'admin' ? <APengajuan /> : <Navigate to="/login" />} />
          <Route path="/AVerifikasi" element={isAuthenticated && role === 'admin' ? <AVerifikasi /> : <Navigate to="/login" />} />
        </Routes>
        <FooterWrapper />
      </main>
    </Router>
  );
};

const NavBarWrapper = ({ role }) => {
  const location = useLocation();
  const shouldRenderNavbar = location.pathname !== '/login' && location.pathname !== '/before';
  return (
    <>
      {shouldRenderNavbar && <Navbar />}
      {shouldRenderNavbar && role === 'admin' && <ANavbar />}
    </>
  );
};

const FooterWrapper = () => {
  const location = useLocation();
  const shouldRenderFooter = location.pathname !== '/pengajuan' 
  && location.pathname !== '/login';
  return (
    <>
      {shouldRenderFooter && <Footer />}
    </>
  );
};

export default App;

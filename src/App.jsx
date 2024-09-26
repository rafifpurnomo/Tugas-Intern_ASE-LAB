import React, { useState } from "react";
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
import AFinalisasi from './components/AdminPage/AFinalisasi/AFinalisasi';
import APengajuan from './components/AdminPage/APengajuan/APengajuan';
import AVerifikasi from './components/AdminPage/AVerifikasi/AVerifikasi';
import ANavbar from './components/AdminPage/ANavbar/ANavbar';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const [user, setUser] = useState({}); // Initialize user object
    const [pengajuan, setPengajuan] = useState([]);

    const handleLogin = (name, userRole, nim, jurusan, angkatan, id) => {
        setIsAuthenticated(true);
        setRole(userRole);
        setUser({ nama: name, nim, jurusan, angkatan, id }); // Store user details
    };

    const addPengajuan = (newPengajuan) => {
        setPengajuan((prev) => [...prev, newPengajuan]); // Add new submission 
    };


    return (
        <Router>
            <NavBarWrapper role={role} nama={user.nama} /> {/* Pass user name here */}
            <main className="main-content">
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            isAuthenticated 
                                ? role === "admin"
                                    ? <Navigate to="/AHome" />
                                    : <Home /> 
                                : <Navigate to="/login" />
                        } 
                    />
                    <Route 
                        path="/login" 
                        element={
                            <Login onLogin={handleLogin} />
                        } 
                    />
                    {/* User Routes */}
                    <Route path="/pengajuan" element={isAuthenticated && role === 'mahasiswa' ? <Pengajuan /> : <Navigate to="/login" />} />
                    <Route path="/before" element={isAuthenticated && role === 'mahasiswa' ? <Beflog /> : <Navigate to="/login" />} />
                    <Route path="/perbaikan" element={isAuthenticated && role === 'mahasiswa' ? <Perbaikan user={user} addPengajuan={addPengajuan}/> : <Navigate to="/login" />} />
                    <Route path="/penggantian" element={isAuthenticated && role === 'mahasiswa' ? <Penggantian user={user} addPengajuan={addPengajuan} /> : <Navigate to="/login" />} />
                    <Route path="/masalah" element={isAuthenticated && role === 'mahasiswa' ? <Masalah user={user} addPengajuan={addPengajuan} /> : <Navigate to="/login" />} />
                    <Route path="/hasil" element={isAuthenticated && role === 'mahasiswa' ? <Hasil user={user} /> : <Navigate to="/login" />} />
                    {/* Admin Routes */}
                    <Route path="/AHome" element={isAuthenticated && role === 'admin' ? <AHome /> : <Navigate to="/login" />} />
                    <Route path="/AFinalisasi" element={isAuthenticated && role === 'admin' ? <AFinalisasi /> : <Navigate to="/login" />} />
                    <Route path="/AVerifikasi/:id_pengajuan_ktm" element={isAuthenticated && role === 'admin' ? <AVerifikasi /> : <Navigate to="/login" />} />
                    <Route path="/APengajuan" element={isAuthenticated && role === 'admin' ? <APengajuan /> : <Navigate to="/login"/>} />
                </Routes>
                <FooterWrapper />
            </main>
        </Router>
    );
};

const NavBarWrapper = ({ role, nama }) => {
    const location = useLocation();
    const shouldRenderNavbar = location.pathname !== '/login' && location.pathname !== '/before';

    return (
        <>
            {shouldRenderNavbar && (
                role === 'admin' 
                    ? <ANavbar nama={nama} /> // Pass user name to ANavbar
                    : <Navbar nama={nama} />  // Pass user name to Navbar
            )}
        </>
    );
};

const FooterWrapper = () => {
    const location = useLocation();
    const shouldRenderFooter = location.pathname !== '/pengajuan' && location.pathname !== '/login';
    return (
        <>
            {shouldRenderFooter && <Footer />}
        </>
    );
};

export default App;

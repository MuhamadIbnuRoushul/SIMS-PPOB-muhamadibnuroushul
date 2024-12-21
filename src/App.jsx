import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider'; // Import AuthProvider
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'; // Halaman utama setelah login
import Navbar from './components/Navbar';
import TopUp from './pages/TopUp';  // Import halaman Top Up
import Transaction from './pages/Transaction';  // Import halaman Transaction
import Account from './pages/Account';  // Import halaman Akun
import Pembayaran from "./pages/Pembayaran";


const App = () => {
  const token = localStorage.getItem('token'); // Ambil token dari localStorage

  // Fungsi untuk memastikan akses ke halaman yang memerlukan login
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      // Jika tidak ada token, arahkan ke halaman login
      return <Navigate to="/login" />;
    }

    return children; // Jika ada token, tampilkan children
  };

  return (
    <AuthProvider>
      <Router>
        {/* Navbar hanya muncul jika ada token */}
        {token && <Navbar />}
        <Routes>
          {/* Redirect "/" to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Proteksi rute yang membutuhkan login */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/top-up" 
            element={
              <ProtectedRoute>
                <TopUp />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pembayaran" 
            element={<ProtectedRoute>
                <Pembayaran />
              </ProtectedRoute>
              } 
          />
          <Route 
            path="/transaction" 
            element={
              <ProtectedRoute>
                <Transaction />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/account" 
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } 
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

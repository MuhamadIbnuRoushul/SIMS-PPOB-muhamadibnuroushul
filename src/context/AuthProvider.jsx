import React, { createContext, useState, useContext } from 'react';

// Buat Context
const AuthContext = createContext();

// Provider untuk menyimpan token
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Fungsi untuk login dan menyimpan token
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Simpan token di localStorage
  };

  // Fungsi untuk logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Hapus token dari localStorage
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook untuk menggunakan Context
export const useAuth = () => useContext(AuthContext);

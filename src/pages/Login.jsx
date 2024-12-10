import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Gunakan hook navigate untuk routing

  const handleLogin = async (e) => {
    e.preventDefault(); // Menghindari refresh halaman saat submit form

    // Validasi input
    if (!email || !password) {
      setError('Email dan password wajib diisi!');
      return;
    }

    try {
      const response = await fetch('https://take-home-test-api.nutech-integrasi.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Mengirim data login
      });

      const result = await response.json();

      if (response.ok) {
        // Jika login berhasil, simpan token di localStorage
        localStorage.setItem('token', result.data.token);
        alert('Login berhasil!');
        navigate('/home');  // Gunakan navigate untuk redirect ke halaman home
      } else {
        setError(result.message || 'Login gagal, periksa kembali email dan password Anda');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Terjadi kesalahan, silakan coba lagi nanti');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-6xl overflow-hidden">
        <div className="w-full sm:w-1/2 p-8 sm:p-10">
          <div className="flex items-center justify-center mb-6 space-x-4">
            <img
              src="./src/assets/Website Assets/logo.png"
              alt="Logo PPOB"
              className="w-auto h-12"
            />
            <h1 className="text-4xl font-bold text-red-600">SIMS PPOB</h1>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          </div>
          <p className="text-gray-600 text-xl text-center font-bold mb-8">Masuk atau buat akun untuk memulai</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Masukkan email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Masukkan password anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              Masuk
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Belum punya akun?{' '}
            <a href="/register" className="text-red-600 hover:underline">
              Daftar disini
            </a>
          </p>
        </div>
        <div className="w-full sm:w-1/2 bg-pink-100 flex items-center justify-center">
          <img
            src="./src/assets/Website Assets/Illustrasi Login.png" // Ganti dengan path gambar yang sesuai
            alt="Ilustrasi Login"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

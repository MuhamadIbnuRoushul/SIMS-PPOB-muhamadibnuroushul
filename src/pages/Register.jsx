import { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi Input
    if (!email || !first_name || !last_name || !password || !confirmPassword) {
      alert('Semua kolom wajib diisi!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    // Kirim data ke API
    try {
      const response = await fetch('https://take-home-test-api.nutech-integrasi.com/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, first_name, last_name, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registrasi berhasil, silakan login!');
        window.location.href = '/login'; // Redirect ke halaman login
      } else {
        alert(`Registrasi gagal: ${result.message || 'Kesalahan server'}`);
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      alert('Terjadi kesalahan. Coba lagi nanti.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex max-w-5xl w-full overflow-hidden">
        {/* Bagian Kiri: Form Registrasi */}
        <div className="w-1/2 p-10 flex flex-col items-center">
          {/* Logo dan Judul */}
          <div className="flex items-center justify-center mb-6 space-x-4">
            <img
              src="./src/assets/Website Assets/logo.png" // Pastikan path sesuai
              alt="Logo PPOB"
              className="w-auto h-12"
            />
            <h1 className="text-4xl font-bold text-red-600">SIMS PPOB</h1>
          </div>

          <p className="text-gray-600 text-xl text-center font-bold mb-8">
            Lengkapi data untuk membuat akun
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
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
                type="text"
                placeholder="Masukkan nama depan"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Masukkan nama belakang"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Buat password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Konfirmasi password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              Daftar
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Sudah punya akun?{' '}
            <a href="/login" className="text-red-600 hover:underline">
              Login disini
            </a>
          </p>
        </div>

        {/* Bagian Kanan: Gambar */}
        <div className="w-1/2 bg-pink-100 flex items-center justify-center">
          <img
            src="./src/assets/Website Assets/Illustrasi Login.png"
            alt="Ilustrasi Registrasi"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;

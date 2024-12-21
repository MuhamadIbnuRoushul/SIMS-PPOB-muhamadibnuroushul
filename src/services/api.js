import axios from 'axios'; 

const API_BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

// Mendapatkan profil pengguna
export const getProfile = async (token) => {
  if (!token) {
    throw new Error("Token is required to fetch the profile.");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Kembalikan data dari respons API
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data?.message || `Error fetching profile (status: ${error.response.status})`
      : "An unexpected error occurred while fetching the profile.";
    
    console.error("Error fetching profile:", errorMessage);
    throw new Error(errorMessage);
  }
};


// Memperbarui gambar profil
export const updateProfileImage = async (token, file) => {
  if (!file) {
    throw new Error("No file selected."); // Validasi jika file tidak ada
  }

  // Validasi format file
  const validFormats = ["image/jpeg", "image/png"];
  if (!validFormats.includes(file.type)) {
    throw new Error("File must be in jpeg or png format.");
  }

  // Validasi ukuran file (maksimal 100KB)
  if (file.size > 100000) {
    throw new Error("File size must be under 100KB.");
  }

  // FormData untuk mengirim file
  const formData = new FormData();
  formData.append("file", file); // Key "file" harus sesuai dengan API Anda

  try {
    const response = await axios.put(`${API_BASE_URL}/profile/image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Bearer Token
        "Content-Type": "multipart/form-data", // Header untuk form-data
      },
    });

    // Validasi respons API
    if (response.data.status === 0) {
      console.log("Profile image updated successfully:", response.data);
      return response.data; // Respons sukses
    } else {
      throw new Error(response.data.message || "Failed to update profile image.");
    }
  } catch (error) {
    // Handling error API
    const errorMessage = error.response
      ? error.response.data?.message || "Error updating profile image."
      : error.message || "An unexpected error occurred.";
    console.error("Error updating profile image:", errorMessage);
    throw new Error(errorMessage);
  }
};


// Memperbarui profil (nama depan, nama belakang)
export const updateProfile = async (token, updatedProfile) => {
  if (!token) {
    throw new Error("Token is required to update the profile.");
  }

  if (!updatedProfile || typeof updatedProfile !== "object") {
    throw new Error("Invalid profile data. Expected an object.");
  }

  try {
    const response = await axios.put(
      "https://take-home-test-api.nutech-integrasi.com/profile/update",
      updatedProfile,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Validasi status API
    if (response.data.status === 0) {
      console.log("Profile updated successfully:", response.data);
      return response.data; // Respons sukses
    } else {
      // Respons API gagal
      throw new Error(response.data.message || "Failed to update profile");
    }
  } catch (error) {
    // Handling error
    const errorMessage = error.response
      ? error.response.data?.message || "Error updating profile"
      : error.message || "An unexpected error occurred";
    console.error("Error updating profile:", errorMessage);
    throw new Error(errorMessage);
  }
};


// Fungsi login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 200) {
      const { token } = response.data.data;
      localStorage.setItem('token', token);
      alert('Login berhasil!');
      window.location.href = '/home';
    } else {
      alert('Login gagal: ' + (response.data.message || 'Kesalahan server'));
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('Login gagal: ' + (error.response ? error.response.data.message : 'Kesalahan server'));
  }
};

// Fungsi logout
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// Fungsi mendapatkan saldo pengguna
export const getBalance = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/balance`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching balance:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fungsi mendapatkan layanan
export const getServices = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching services:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fungsi mendapatkan banner
export const getBanners = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/banner`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching banners:', error.response ? error.response.data : error.message);
    throw error;
  }
};


// Fungsi untuk melakukan Top Up
export const topUp = async (token, amount) => {
  try {
    // Validasi jumlah top-up di sisi klien
    if (isNaN(amount) || amount <= 0) {
      throw new Error("Jumlah Top Up harus berupa angka dan lebih besar dari 0.");
    }

    // Header Authorization untuk JWT Token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Body untuk request
    const body = {
      top_up_amount: amount,
    };

    // Kirim POST request ke API
    const response = await axios.post(`${API_BASE_URL}/topup`, body, { headers });

    // Periksa status API
    if (response.data.status !== 0) {
      throw new Error(response.data.message || "Top Up gagal.");
    }

    return response.data; // Return hasil sukses
  } catch (error) {
    console.error("Error in topUp:", error.response?.data || error.message);
    throw error; // Lempar error agar bisa ditangani di komponen
  }
};


export const transaction = async (token, serviceCode, amount) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/transaction`,
      {
        service_code: serviceCode,
        amount: amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Kembalikan data dari API
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Transaction failed.");
    }
    throw new Error(error.message);
  }
};

// Fungsi untuk mendapatkan riwayat transaksi
export const getTransactionHistory = async (token, limit = 5, offset = 0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transaction/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { limit, offset }, // Tambahkan parameter limit dan offset
    });
    return response.data?.data || {}; // Ambil data lengkap (offset, limit, records)
  } catch (error) {
    console.error("Error fetching transaction history:", error.response?.data || error.message);
    throw error;
  }
};


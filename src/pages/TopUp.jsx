import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, getBalance, topUp } from "../services/api"; // Pastikan ada fungsi topUp di API
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import BalanceSection from "../components/BalanceSection";

const TopUp = () => {
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(true);
  const [nominal, setNominal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          const [profileData, balanceData] = await Promise.all([
            getProfile(token),
            getBalance(token),
          ]);

          setProfile(profileData?.data || null);
          setBalance(balanceData?.data?.balance || 0);
        } catch (err) {
          setError("Error loading data: " + err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [token, navigate]);

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  const handleNominalChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Hanya angka
    setNominal(value);
  };

  const handleTopUp = async () => {
    try {
      const response = await topUp(token, nominal); // Memanggil API dengan parameter nominal
      if (response.status === 0) {
        alert('Top Up berhasil! Saldo Anda sekarang: Rp ' + response.data.balance);
        setBalance(response.data.balance); // Perbarui saldo
      } else {
        alert('Top Up gagal: ' + response.message);
      }
    } catch (error) {
      alert(
        'Terjadi kesalahan saat melakukan top-up: ' +
          (error.response?.data?.message || error.message)
      );
    }
  };
  

  const formattedNominal = nominal
    ? "Rp. " + parseInt(nominal, 10).toLocaleString("id-ID")
    : "";

  return (
    <div className="min-h-screen bg-white pt-20">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 mt-6 flex flex-col md:flex-row gap-6">
        <Profile profile={profile} error={error} isLoading={isLoading} />
        <BalanceSection balance={balance} showBalance={showBalance} toggleBalance={toggleBalance} />
      </div>

      <div className="max-w-7xl mx-auto p-6 pt-9 mt-6 flex flex-col gap-6">
        <h3 className="text-xl font-semibold text-gray-600">
          Silahkan masukkan <br />
          <span className="text-3xl">Nominal Top Up</span>
        </h3>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Masukkan Nominal"
              className="w-full p-3 border border-gray-300 rounded mt-4"
              value={formattedNominal}
              onChange={handleNominalChange}
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-wrap gap-4 mt-4">
            {["10000", "20000", "50000", "100000", "250000", "500000"].map((amount) => (
              <button
                key={amount}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
                onClick={() => setNominal(amount)}
              >
                Rp. {parseInt(amount, 10).toLocaleString("id-ID")}
              </button>
            ))}
          </div>
        </div>

        <button
          className={`w-full md:w-1/2 bg-gray-500 text-white py-2 px-4 rounded-md ${
            !nominal ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
          }`}
          onClick={handleTopUp}
          disabled={!nominal}
        >
          Top Up
        </button>
      </div>
    </div>
  );
};

export default TopUp;

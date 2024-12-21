import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, getBalance, topUp } from "../services/api";

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
    if (!nominal || nominal <= 0) {
      alert("Masukkan nominal yang valid.");
      return;
    }

    try {
      const response = await topUp(token, parseInt(nominal, 10)); // Pastikan nominal adalah angka
      if (response.status === 0) {
        alert("Top Up berhasil! Saldo Anda sekarang: Rp " + response.data.balance.toLocaleString("id-ID"));
        setBalance(response.data.balance); // Perbarui saldo
        setNominal(""); // Reset input setelah top-up berhasil
      } else {
        alert("Top Up gagal: " + response.message);
      }
    } catch (error) {
      alert(
        "Terjadi kesalahan saat melakukan top-up: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handlePresetNominal = (amount) => {
    setNominal(amount); // Set nominal dari tombol shortcut
  };

  const formattedNominal = nominal ? "Rp. " + parseInt(nominal, 10).toLocaleString("id-ID") : "";

  return (
    <div className="min-h-screen bg-white pt-20">
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
            <button className={`w-full bg-gray-400 text-white py-2 px-4 rounded-md mt-4 ${!nominal }`} onClick={handleTopUp} disabled={!nominal}>Top Up</button>
          </div>
          
          <div className="w-full md:w-1/2 flex flex-wrap gap-5 mt-4">{["10000", "20000", "50000", "100000", "250000", "500000"].map((amount) => (
            <button key={amount} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300" onClick={() => handlePresetNominal(amount)}>
              Rp. {parseInt(amount, 10).toLocaleString("id-ID")}
            </button>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TopUp;
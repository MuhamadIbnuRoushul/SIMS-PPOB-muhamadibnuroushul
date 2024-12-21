import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { transaction, getProfile, getBalance} from "../services/api";
import BalanceSection from "../components/BalanceSection";
import Profile from "../components/Profile";

const Pembayaran = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service; // Data service dari state
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch profile dan balance saat komponen dimuat
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [profileData, balanceData] = await Promise.all([
          getProfile(token),
          getBalance(token),
        ]);
        setProfile(profileData?.data || null);
        setBalance(balanceData?.data?.balance || 0);
      } catch (error) {
        setError("Error loading data: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  // Toggling saldo
  const toggleBalance = () => setShowBalance(!showBalance);

  // Handle pembayaran
  const handlePayment = async () => {
    try {
      const response = await transaction(token, service.service_code);
      if (response.status === 0) {
        alert(`Pembayaran berhasil! Invoice: ${response.data.invoice_number}`);
        navigate("/Transaction");
      } else {
        alert(`Pembayaran gagal: ${response.message}`);
      }
    } catch (error) {
      alert(
        `Terjadi kesalahan saat melakukan pembayaran: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  if (!service) {
    return <p>Data layanan tidak tersedia. Silakan pilih layanan kembali.</p>;
  }
  

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto p-6 mt-6 flex flex-col md:flex-row gap-6">
        <Profile profile={profile} error={error} isLoading={isLoading} />
        <BalanceSection
          balance={balance}
          showBalance={showBalance}
          toggleBalance={toggleBalance}
        />
      </div>

      <div className="max-w-7xl mx-auto p-6 mt-6 flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold text-gray-600">PemBayaran</h1>
        
        <div className="flex items-center space-x-4">
          <img
            src={service.service_icon}
            alt={`Ikon layanan: ${service.service_name}`}
            className="w-8 h-8"
          />
          <h1 className="text-2xl font-semibold text-gray-600">{service.service_name}</h1>
        </div>
        <div className="mb-4">
          <p className="text-xl mb-3 p-2 font-bold border-solid border-4"> Rp {parseInt(service.service_tariff).toLocaleString("id-ID")}</p>
          <button
            type="button"
            className="w-full bg-red-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-600 transition-colors"
            onClick={handlePayment}
          >
            Bayar
          </button>
        </div>
      </div>
    </div>

  );
};

export default Pembayaran;

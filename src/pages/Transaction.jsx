import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, getBalance, getTransactionHistory } from "../services/api";
import BalanceSection from "../components/BalanceSection";
import Profile from "../components/Profile";

const Transaction = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [offset, setOffset] = useState(0); // Offset untuk pagination
  const [hasMore, setHasMore] = useState(true); // Indikator jika ada lebih banyak data
  const limit = 5; // Jumlah transaksi per halaman

  const toggleBalance = () => setShowBalance(!showBalance);

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
    fetchTransactions(); // Muat transaksi pertama kali
  }, [token, navigate]);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactionHistory(token, limit, offset);
      setTransactions((prev) => [...prev, ...data.records]); // Tambahkan data baru
      setHasMore(data.records.length === limit); // Jika data kurang dari limit, berarti tidak ada data lagi
    } catch (error) {
      setError("Error loading transactions: " + error.message);
    }
  };

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + limit); // Tambahkan offset
  };

  useEffect(() => {
    if (offset > 0) fetchTransactions(); // Muat data saat offset berubah
  }, [offset]);

  if (isLoading) {
    return <p className="text-center text-lg font-medium">Loading...</p>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto p-6 mt-6 flex flex-col md:flex-row gap-6">
        <Profile profile={profile} error={error} isLoading={isLoading} />
        <BalanceSection
          balance={balance}
          showBalance={showBalance}
          toggleBalance={toggleBalance}
        />
      </div>

      {/* Transactions Section */}
      <div className="max-w-7xl mx-auto p-6 mt-6">
        <h1 className="text-2xl font-semibold text-gray-700">Semua Transaksi</h1>
        <div className="mt-4 bg-gray-100 p-4 rounded-md shadow-md">
          {transactions.length > 0 ? (
            transactions.map((txn, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-md shadow-sm mb-4 border border-gray-200"
              >
                <p className="text-lg font-medium text-gray-700">
                  Invoice: {txn.invoice_number}
                </p>
                <p className="text-gray-600">Deskripsi: {txn.description}</p>
                <p className="text-gray-600">
                  Nominal: Rp {txn.total_amount.toLocaleString("id-ID")}
                </p>
                <p className="text-gray-500">
                  Tanggal: {new Date(txn.created_on).toLocaleDateString("id-ID")}
                </p>
                <p className="text-gray-500">Tipe: {txn.transaction_type}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Tidak ada transaksi yang ditemukan.</p>
          )}
        </div>
        {hasMore && (<div className="flex justify-center mt-4">
          <button className="bg-red-500 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-red-600 transition-colors" onClick={handleShowMore}>
            Show More
          </button>
        </div>)}
      </div>
    </div>
  );
};

export default Transaction;

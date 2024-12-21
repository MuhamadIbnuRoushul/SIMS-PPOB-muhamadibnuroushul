import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, getBalance, getBanners, getServices } from '../services/api';
import Navbar from '../components/Navbar';
import BannerSlider from '../components/BannerSlider';
import Profile from '../components/Profile';
import BalanceSection from '../components/BalanceSection'
import ServicesSection from '../components/ServicesSection';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(true);
  const [services, setServices] = useState([]);
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      const fetchData = async () => {
        try {
          // Mengambil data dengan Promise.all
          const [profileData, servicesData, balanceData, bannerData] = await Promise.all([
            getProfile(token),
            getServices(token),
            getBalance(token),
            getBanners(token),
          ]);
  
          // Cek dan set data banners
          if (Array.isArray(bannerData)) {
            setBanners(bannerData);
          } else {
            setBanners([]);
          }
  
          // Set data profile dengan akses profileData.data
          if (profileData && profileData.data) {
            setProfile(profileData.data);  // Set profile dengan data yang benar
          } else {
            setProfile(null);  // Jika tidak ada data profile
          }
  
          setServices(servicesData);
          setBalance(balanceData.data.balance || 0);
        } catch (err) {
          setError('Error loading data: ' + err.message);
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
  

  return (
    <div className="min-h-screen bg-white pt-20">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 mt-6 flex flex-col md:flex-row gap-6">
        <Profile profile={profile} error={error} isLoading={isLoading} />
        <BalanceSection balance={balance} showBalance={showBalance} toggleBalance={toggleBalance} />
      </div>

      <div>
        <ServicesSection services={services} isLoading={isLoading} error={error} />
      </div>

      <div className="max-w-7xl mx-auto p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Temukan Promo Terbaik</h2>
        <BannerSlider banners={banners} />
      </div>
    </div>
  );
};

export default Home;

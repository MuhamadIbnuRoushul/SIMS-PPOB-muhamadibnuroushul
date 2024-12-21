// import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ServicesList = ({ services = [] }) => {
  const navigate = useNavigate();

  // Fungsi untuk navigasi ke halaman Pembayaran
  const handleServiceClick = (service) => {
    navigate("/pembayaran", { state: { service } }); // Kirim data layanan ke halaman pembayaran
  };

  return (
    <div className="flex flex-wrap justify-start gap-2">
      {services.map((service) => (
        <div key={service.service_code} onClick={() => handleServiceClick(service)}>
        <img src={service.service_icon} alt={service.service_name} className="w-19 h-19 mx-auto mb-4 transition-transform"/>
          <h3 className="text-sm font-semibold text-center">{service.service_name}</h3>
        </div>
      ))}
    </div>
  );
};

ServicesList.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      service_code: PropTypes.string.isRequired,
      service_name: PropTypes.string.isRequired,
      service_icon: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ServicesList;

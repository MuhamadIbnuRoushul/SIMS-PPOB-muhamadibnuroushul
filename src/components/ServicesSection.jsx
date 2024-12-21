import PropTypes from "prop-types";
import ServicesList from "./ServicesList";

const ServiceSection = ({ services = [], isLoading = false, error = "" }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Daftar Layanan</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <p>Loading services...</p> {/* Skeleton loader bisa ditambahkan di sini */}
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : services.length === 0 ? (
        <p className="text-gray text-center">Tidak ada layanan tersedia saat ini.</p>
      ) : (
        <ServicesList services={services} />
      )}
    </div>
  );
};

ServiceSection.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      service_code: PropTypes.string.isRequired,
      service_name: PropTypes.string.isRequired,
      service_icon: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};
export default ServiceSection;

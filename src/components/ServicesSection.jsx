/* eslint-disable react/prop-types */

import React from 'react';
import ServicesList from './ServicesList';

const ServiceSection = ({ services, isLoading, error }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Daftar Layanan</h2>
      {isLoading ? (
        <p>Loading services...</p>  // Loading message untuk layanan
      ) : error ? (
        <p className="text-red-500">{error}</p>  // Menampilkan pesan error jika ada
      ) : (
        <ServicesList services={services} />  // Menampilkan layanan jika tidak ada error
      )}
    </div>
  );
};

export default ServiceSection;


/* eslint-disable react/prop-types */

// src/components/ServicesList.jsx

import React from 'react';

const ServicesList = ({ services }) => { 
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {services.map((service) => (
        <div
          key={service.service_code}
          className="p-1"  // Set lebar tetap untuk setiap card layanan
        >
          <img
            src={service.service_icon}
            alt={service.service_name}
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="text-m font-semibold text-center">{service.service_name}</h3>
        </div>
      ))}
    </div>
  );
};


export default ServicesList;

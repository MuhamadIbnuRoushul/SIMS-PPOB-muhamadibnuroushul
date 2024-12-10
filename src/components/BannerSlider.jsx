/* eslint-disable react/prop-types */
import React from 'react';

const BannerSlider = ({ banners }) => {
  return (
    <div className="overflow-hidden">
      <div className="flex space-x-4">
        {banners.map((banner) => (
          <div
            key={banner.banner_name}
            className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4"
          >
            <img
              src={banner.banner_image}
              alt={banner.banner_name}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;

/* eslint-disable react/prop-types */
import React from 'react';

const Profile = ({ profile, error, isLoading }) => {
  return (
    <div className="flex-1 bg-white" style={{ maxHeight: '200px', overflowY: 'auto' }}>
      {isLoading ? (
        <p>Loading profile...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : profile ? (
        <div>
          <div className="flex flex-col items-start space-y-4">
            {/* Profile image */}
            <img
              src={profile.profile_image || './src/assets/Website Assets/default-profile.png'}
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
            {/* Profile name and email */}
            <div className="">
              <h3 className="text-xl font-semibold text-gray-600">Selamat datang,</h3>
              <h3 className="text-xl font-semibold">{profile.first_name} {profile.last_name}</h3>
            </div>
          </div>
        </div>
      ) : (
        <p>Profile not found</p>
      )}
    </div>
  );
};

export default Profile;

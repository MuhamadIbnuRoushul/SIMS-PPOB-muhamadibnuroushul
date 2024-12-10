import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../assets/Website Assets/Profile Photo.png";
import { getProfile, updateProfileImage, updateProfile } from "../services/api";

const Account = () => {
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const fetchProfile = async () => {
        try {
          const response = await getProfile(token);
          if (response.status === 0) {
            const { email, first_name, last_name, profile_image } = response.data;
            setEmail(email);
            setFirstName(first_name);
            setLastName(last_name);
            setProfileImage(profile_image || defaultProfileImage);
          } else {
            alert("Failed to load profile");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          alert("Error loading profile data");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchProfile();
    }
    
  }, [token, navigate]);
  

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size <= 100000) {
        try {
          const updatedProfile = await updateProfileImage(token, file);
          setProfileImage(updatedProfile.data.profile_image);
          alert("Profile picture updated successfully!");
        } catch (error) {
          alert(`Error: ${error.message}`);
          console.error("Error updating profile picture:", error);
        }
      } else {
        alert("File size must be under 100KB");
      }
    } else {
      alert("No file selected. Please choose a file to upload.");
    }
  };

  const handleSaveProfile = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      alert("First name and last name cannot be empty.");
      return;
    }

    setIsSaving(true);
    try {
      const updatedProfile = { first_name: firstName, last_name: lastName };
      const response = await updateProfile(token, updatedProfile);
      if (response.status === 0) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">Account</h1>
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <label htmlFor="upload-profile" className="absolute bottom-0 right-0">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow cursor-pointer">
              ✎
            </div>
          </label>
          <input
            type="file"
            id="upload-profile"
            className="hidden"
            accept="image/jpeg, image/png"
            onChange={handleProfileImageChange}
          />
        </div>
        <h2 className="text-xl font-semibold mb-6">{`${firstName} ${lastName}`}</h2>
        <div className="w-full mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="w-full mb-4">
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={!isEditing}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="w-full mb-4">
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={!isEditing}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        {!isEditing ? (
          <button
            className="w-full bg-blue-500 text-white py-2 rounded mb-4"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <button
            className="w-full bg-green-500 text-white py-2 rounded mb-4"
            onClick={handleSaveProfile}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        )}
        <button
          className="w-full bg-red-500 text-white py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;

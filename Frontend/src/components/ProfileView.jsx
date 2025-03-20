import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileView = ({ user }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="flex items-center space-x-4 cursor-pointer" onClick={handleProfileClick}>
      <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
        {user.profilePic ? (
          <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover rounded-full" />
        ) : (
          <span className="text-2xl font-bold text-green-600">{user.username.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <div>
        <p className="font-semibold">{user.username}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileView;
import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUserCircle } from 'react-icons/fa';

const UserProfile = ({ user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src={user.avatar || 'https://via.placeholder.com/150'} alt={user.name} />
          </div>
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{user.role}</div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 group-hover:text-gray-600 transition duration-300 ease-in-out">
              {user.name}
            </h1>
            <p className="mt-2 text-gray-600">{user.bio}</p>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-gray-50 transition duration-300 ease-in-out">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FaEnvelope className="mr-2 text-indigo-500" />
                Email
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-gray-50 transition duration-300 ease-in-out">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FaPhone className="mr-2 text-indigo-500" />
                Phone
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.phone}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-gray-50 transition duration-300 ease-in-out">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.address}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-gray-50 transition duration-300 ease-in-out">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FaCalendarAlt className="mr-2 text-indigo-500" />
                Date of Birth
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.dob}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-gray-50 transition duration-300 ease-in-out">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FaUserCircle className="mr-2 text-indigo-500" />
                Gender
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.gender}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
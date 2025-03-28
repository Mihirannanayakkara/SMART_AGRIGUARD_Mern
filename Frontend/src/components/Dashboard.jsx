import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSideNavbar from '../components/UserSideNavbar';

const Dashboard = () => {
  // You might want to fetch the user data here or pass it from a parent component
  const user = { name: 'John Doe' }; // Example user data

  return (
    <div className="flex h-screen overflow-hidden">
      <UserSideNavbar user={user} />
      <main className="flex-1 overflow-y-auto">
        <div className>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
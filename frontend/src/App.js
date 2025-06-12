import React, { useState } from 'react';
import Login from './components/Login';
import UserRoleTable from './components/UserRoleTable';
import UserPanel from './components/UserPanel';  // if used


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <UserRoleTable />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

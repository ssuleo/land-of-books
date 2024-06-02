import React, { createContext, useContext, useState } from 'react';
import { removeCookie } from '../components/Token';

const NavbarContext = createContext();

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const login = (userData) => {
    setUser(userData); 
  };

  const logout = () => {
    removeCookie('token');
  };

  return (
    <NavbarContext.Provider value={{ user, login, logout }}>
      {children}
    </NavbarContext.Provider>
  );
};